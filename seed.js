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
var connectionString =
    "postgres://njjirohsqwudpj:702251b57fbaa99940b6ac092f5434d40269055b960b292af456d3c706ad659a@ec2-54-173-77-184.compute-1.amazonaws.com:5432/d6ac9eomsodpfe";
const client = new pg.Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
});

client.connect(function (err) {
    if (err) console.log(err, " ...Error connecting to PSQL");
    // Create Users Table
    // client.query(
    //     "CREATE TABLE users(id SERIAL PRIMARY KEY,\
    //     email varchar(100),\
    //     fn varchar(50),\
    //     ln varchar(50),\
    //     type varchar(50),\
    //     username varchar(100),\
    //     pw varchar(150),\
    //     creationdate varchar(100))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    client.query(
        "ALTER TABLE users ADD COLUMN picture varchar(150)",
        (err, resp) => {
            if (err) {
                console.log(err, " Error ");
            } else {
                console.log(resp, " SUCCESS ");
            }
        }
    );
});
