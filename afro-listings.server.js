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

// AWS Data belo
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

    server.listen(process.env.PORT || 5001, (err) => {
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

    server.post("/getProfile", async (req, res) => {
      // Fetch by username
      const data = await client.query(
        "SELECT username, type, email, fn, ln, picture FROM users WHERE username = ($1)",
        [req.headers.handle.trim()]
      );
      if (data.rows.length) {
        console.log(data.rows[0]);
        res.end(JSON.stringify(data.rows[0]));
      } else {
        res.end(JSON.stringify({}));
      }
    });

    server.post("/userlistings", async (req, res) => {
      // Fetch by username
      const data = await client.query(
        "SELECT users.username, listings.id, listings.city, listings.subcategory, listings.userid, listings.title, listings.description, \
        category.val AS category_name, subcategory.val AS subcategory_name, listings.category, listings.zip,\
        listings.likes, listings.shares, listings.bookmarks, listings.creationdate, media.type AS mediatype, media.format, media.url \
        FROM listings INNER JOIN media ON listings.id = media.listing_id INNER JOIN users ON listings.userid = users.id \
        INNER JOIN category ON listings.category = category.id INNER JOIN subcategory ON listings.subcategory = subcategory.id WHERE users.username = ($1)",
        [req.headers.handle.trim()]
      );
      if (data.rows.length) {
        res.end(JSON.stringify(data.rows));
      } else {
        res.end(JSON.stringify([]));
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

    server.post("/listingsByParams", async (req, res) => {
      const { location } = req.headers;
      const data = await client.query(
        "SELECT users.username, listings.id, listings.city, listings.subcategory, listings.userid, listings.title, listings.description, \
        category.val AS category_name, subcategory.val AS subcategory_name, listings.category, listings.zip,\
        listings.likes, listings.shares, listings.bookmarks, listings.creationdate, media.type AS mediatype, media.format, media.url \
        FROM listings INNER JOIN media ON listings.id = media.listing_id INNER JOIN users ON listings.userid = users.id \
        INNER JOIN category ON listings.category = category.id INNER JOIN subcategory ON listings.subcategory = subcategory.id WHERE listings.zip LIKE ($1)",
        [`%${location}%`]
      ); // Fetch by email then check encrypted password
      if (data.rows.length) {
        res.end(JSON.stringify(data.rows));
      } else {
        res.end(JSON.stringify({}));
      }
    });

    // Fetches presigned S3 URL
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
        user_id,
        description,
        phone,
        state,
        city,
        website,
        zip,
        address_2,
        address,
        category,
        subcategory,
        message,
        body: listing_body,
        media,
      } = JSON.parse(req.headers.listing_data);
      let listing_res;
      try {
        listing_res = await client.query(
          "INSERT INTO listings(title,description,category,subcategory,phone,state,city,zip,\
        address_2,address,userid,body,website,creationdate) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING ID",
          [
            title,
            description,
            parseInt(category),
            parseInt(subcategory),
            phone,
            state,
            city,
            zip,
            address_2,
            address,
            parseInt(user_id),
            listing_body,
            website,
            new Date(),
          ]
        );
        // Use new listings id for media items
        if (media.length) {
          for await (const item of media) {
            let media_res;
            media_res = await client.query(
              "INSERT INTO media(type,format,url,main,listing_id) VALUES($1,$2,$3,$4,$5)",
              [item.type, item.format, item.url, true, listing_res.rows[0]?.id]
            );
          }
        }
        res.end(
          JSON.stringify(listing_res?.rows?.length ? listing_res.rows[0] : {})
        );
      } catch (err) {
        console.log(err, " Error insterting into listings ");
        res.end(JSON.stringify({ error: err }));
      }
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
