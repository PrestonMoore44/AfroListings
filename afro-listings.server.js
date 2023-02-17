require("dotenv").config();
var fs = require("fs");
var XLSX = require("xlsx");
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

    //     const data = await client.query(
    //         "INSERT INTO listing(userid, type, title, description, zip, likes, shares, bookmarks, city, creationdate) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
    //         [userid, type, title, desc, zip, 0, 0, 0, city, new Date()]
    //     );
    //     console.log(data.rows[0].id);
    //     const media = await client.query(
    //         "INSERT INTO media(type, format, postid, url) VALUES($1, $2, $3, $4)",
    //         ["image", ".jpg", data.rows[0].id, src]
    //     );
    // }

    server.post("/listings", async (req, res) => {
      console.log(" Hello world ");
      const data = await client.query(
        "SELECT users.username, listing.id, listing.city, listing.subtype, listing.userid, listing.title, listing.description, listing.type, listing.zip,\
        listing.likes, listing.shares, listing.bookmarks, listing.creationdate, media.type AS mediatype, media.format, media.url \
        FROM listing INNER JOIN media ON listing.id = media.postid INNER JOIN users ON listing.userid = users.id"
      ); // Fetch by email then check encrypted password
      if (data.rows.length) {
        res.end(JSON.stringify(data.rows));
      } else {
        res.end(JSON.stringify({}));
      }
    });

    server.post("/login", async (req, res) => {
      const { email, password } = req.headers;
      const user = await client.query("SELECT * FROM users WHERE email=($1)", [
        email.trim(),
      ]); // Fetch by email then check encrypted password
      if (user.rows.length && bcrypt.compareSync(password, user.rows[0].pw)) {
        res.end(JSON.stringify(user.rows[0]));
      } else {
        res.end(JSON.stringify({}));
      }
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
            console.log(resp, " Resp ");
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
