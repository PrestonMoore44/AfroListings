require("dotenv").config();
var fs = require("fs");
var XLSX = require("xlsx");
var crypto = require("crypto");
var { promisify } = require("util");
var nodemailer = require("nodemailer");
const express = require("express");
const next = require("next");
var https = require("https");
const cors = require("cors");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
var pg = require("pg");
pg.defaults.ssl = true;
var connectionString = process.env.CONNECTION_STRING;
const client = new pg.Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});
const bcrypt = require("bcrypt");
const saltRounds = 10;
const randomBytes = promisify(crypto.randomBytes);

// AWS Data below
const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: "v4",
  region: process.env.AWS_BUCKET_REGION,
});

client.connect(function (err) {
  if (err) console.log(err, " ...Error connecting to PSQL");
  console.log("Connected... to... "); //'/notifications'
});

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  req.method === "OPTIONS" ? res.sendStatus(200) : next();
};

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(express.json());
    server.use(allowCrossDomain);

    // Must be nextjs page...
    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(process.env.PORT || 5000, (err) => {
      if (err) throw err;
      console.log(" Ready on... port", this, server.settings.env);
    });

    server.post("/listing", async (req, res) => {
      const data = await client.query(
        "SELECT users.username, listings.id, listings.city, listings.subcategory, listings.userid, listings.title, listings.description, listings.category, listings.zip,\
        listings.likes, listings.shares, subcategory.val AS subcategory_name, category.val AS category_name, listings.bookmarks, listings.creationdate, media.type AS mediatype, media.format, media.url \
        FROM listings INNER JOIN media ON listings.id = media.listing_id INNER JOIN users ON listings.userid = users.id \
        INNER JOIN category ON listings.category = category.id INNER JOIN subcategory ON listings.subcategory = subcategory.id WHERE listings.id = ($1)",
        [parseInt(req.headers.lid)]
      ); // Fetch by email then check encrypted password
      if (data.rows.length) {
        res.end(JSON.stringify(data.rows[0]));
      } else {
        res.end(JSON.stringify({}));
      }
    });

    server.post("/listings", async (req, res) => {
      const data = await client.query(
        "SELECT users.username, listings.id, listings.city, listings.subcategory, listings.userid, listings.title, listings.description, \
        category.val AS category_name, subcategory.val AS subcategory_name, listings.category, listings.zip,\
        listings.likes, listings.shares, listings.bookmarks, listings.creationdate, media.type AS mediatype, media.format, media.url \
        FROM listings INNER JOIN media ON listings.id = media.listing_id INNER JOIN users ON listings.userid = users.id \
        INNER JOIN category ON listings.category = category.id INNER JOIN subcategory ON listings.subcategory = subcategory.id"
      ); // Fetch by email then check encrypted password
      if (data.rows.length) {
        res.end(JSON.stringify(data.rows));
      } else {
        res.end(JSON.stringify({}));
      }
    });

    server.post("/awsUploadURL", async (req, res) => {
      const rawBytes = await randomBytes(16);
      const imageName = rawBytes.toString("hex");
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Expires: 60,
      };
      const uploadURL = await s3.getSignedUrlPromise("putObject", params);
      res.end(uploadURL);
    });

    server.post("/saveListing", async (req, res) => {
      const {
        title,
        description,
        phone,
        category,
        subcategory,
        message,
        body,
        media,
      } = JSON.parse(req.headers.listing_data);
      console.log(req.headers?.listing_data);
      media?.forEach((it) => {
        console.log(it, " Media item");
      });
      console.log(
        title,
        description,
        phone,
        category,
        subcategory,
        message,
        body,
        media
      );
      const imageURL =
        "https://newbucketpj.s3.us-west-1.amazonaws.com/tutor.jpeg";
      // const resBuffer = await fetch(imageURL);
      // const blob = await resBuffer.buffer();
      // const uploadedImage = await s3
      //   .upload({
      //     Bucket: process.env.AWS_BUCKET_NAME,
      //     Key: "ServerFileName",
      //     Body: blob,
      //   })
      //   .promise();
      // console.log(uploadedImage, " Uploaded image");
      res.end(JSON.stringify({}));
    });

    server.post("/login", async (req, res) => {
      const { email, password, email_verified = false } = req.headers;
      const user = await client.query("SELECT * FROM users WHERE email=($1)", [
        email.trim(),
      ]); // Fetch by email then check encrypted password
      if (user.rows.length) {
        if (bcrypt.compareSync(password, user.rows[0].pw) || email_verified) {
          res.end(JSON.stringify(user.rows[0]));
        } else {
          res.end(JSON.stringify({}));
        }
      } else {
        res.end(JSON.stringify({}));
      }
    });

    server.post("/getCategories", async (req, res) => {
      const data = await client.query("SELECT * FROM category");
      res.end(JSON.stringify(data.rows));
    });

    server.post("/getSubCategories", async (req, res) => {
      const data = await client.query("SELECT * FROM subcategory");
      res.end(JSON.stringify(data.rows));
    });

    server.post("/saveUser", async (req, res) => {
      const { email, username, password, picture } = req.headers;
      const hash = bcrypt.hashSync(password, saltRounds);
      const user = await client.query("SELECT * FROM users WHERE email=($1)", [
        email.trim(),
      ]);
      if (!user.rows.length) {
        client.query(
          "INSERT INTO users(username, type, email, pw, picture) VALUES ($1,$2,$3,$4,$5) RETURNING ID",
          [username, "standard", email, hash, picture],
          (e, resp) => {
            // Encrypt password later...
            if (e) console.log(e, " Error insterting new user");
            res.end(
              JSON.stringify(
                resp?.rows && resp?.rows?.length ? resp.rows[0] : {}
              )
            );
          }
        );
      } else {
        res.end(JSON.stringify({}));
      }
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
