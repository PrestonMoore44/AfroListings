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
    "postgres://wrkqpwlbcaesjq:8c9da3f076d8d9d79f169b84f5046df2f5518c47e2296a79ea012e8e7ce97a60@ec2-44-214-9-130.compute-1.amazonaws.com:5432/d2upldvivgr33h";
const client = new pg.Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false },
});

const businessArr = [
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/tutor.jpeg",
        user: "Nancy Cooks",
        type: "business",
        city: "Oakland",
        zip: 94501,
        subtype: "education",
        title: "Private tutoring with Nancy",
        desc: "Give a child a headstart with tutoring. I'm a teacher with 5 years teaching experience",
    },
    {
        userid: 1,
        city: "Oakland",
        zip: 94501,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/creditOption.jpeg",
        user: "Credit Master Sean",
        type: "business",
        subtype: "finance",
        title: "Have an 800 Credit Score Yet",
        desc: "We can get you there! 5 star credit repair at Valley Wide Credit Repair",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/stylist.jpg",
        user: "Kesha Kay",
        type: "business",
        subtype: "stylist",
        title: "Is Your Hair Ready For The Big Event",
        desc: "Licensed stylist specializing in braids, and dreadlocks",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/business_4.jpg",
        user: "Don McStashinbuggle",
        type: "business",
        subtype: "finance",
        title: "Guaranteed Issue Whole Life Policy Up To 1 Million",
        desc: "Licensed insurance agent to secure generational wealth for your family",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_1.jpg",
        user: "Honey Tea LLC",
        type: "food",
        subtype: "restaurant",
        title: "Have You Heard of Just Add Honey Tea Company",
        desc: "Blended tea's for everyone! Sweetened and served just for you",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_2.jpg",
        user: "Hammin's All Star BBQ",
        type: "food",
        subtype: "restaurant",
        title: "Lip Smackin Hammin's BBQ Will Leave You Speachless",
        desc: "Award winning BBQ for the entire family. Pull up and see what everyone's talking about",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_3.jpg",
        user: "Wendy's Kitchen",
        type: "food",
        subtype: "restaurant",
        title: "Wendy's Southern Kitchen Is The Best in the Midwest",
        desc: "Traditional Souther Cousine with a midwest twist",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/rest_4.jpg",
        user: "Carl Kitchens",
        type: "food",
        subtype: "food truck",
        title: "Have You Tasted What The Hype is About At Cartel's Kitchen",
        desc: "Our signature fried wings and thigs are quickly becoming legendary",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_1.jpg",
        user: "Paramount Properties LLC",
        type: "housing",
        subtype: "rent",
        title: "Modern 1 Bedroom Studio in Heart of Downtown",
        desc: "In the heart of the much desired downtown district",
    },
    {
        city: "Oakland",
        zip: 94501,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_2.jpg",
        user: "Yannique Golden",
        type: "housing",
        subtype: "rent",
        title: "3 Bedroom 2 Bath Home For Rent in Central Fresno",
        desc: "Spacious home recently remodeled in Central Unified school district",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_3.jpg",
        user: "AJ For The Win",
        type: "housing",
        subtype: "rent",
        title: "2 Bedroom 1.5 Bath Apartment For Rent in Anticoch",
        desc: "Two story apartment with spacious patio and attached garage",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/housing_4.jpg",
        user: "New Beginnings Properties LLC",
        type: "housing",
        subtype: "sale",
        title: "4 Bedroom 2 Bath Home for Sale in Clovis",
        desc: "Over 2500 square feet of modern living with a hint of country charm",
    },
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_1.jpg",
        user: "Johnny the Activist",
        type: "politics",
        subtype: "standard",
        city: "Oakland",
        zip: 94501,
        title: "Gun Rights Activist Says Black Guns Matter",
        desc: "Private tutoring with Nancy",
    },
    {
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_2.jpg",
        user: "Highlife Movements",
        type: "politics",
        city: "Oakland",
        zip: 94501,
        subtype: "standard",
        title: "Why Reparations 2023 May Be Reality For Californian's",
        desc: "5 star credit repair at Valley Wide Credit Repair",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_3.jpg",
        user: "Tremale Jacobs",
        type: "politics",
        subtype: "standard",
        title: "Why Mattlock Belives He Has The Winning Ticket",
        desc: "We belive in results and let our actions do the talking",
    },
    {
        city: "Fresno",
        zip: 93722,
        userid: 1,
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_4.jpg",
        user: "Black Insider",
        type: "politics",
        subtype: "standard",
        title: "Why These Two California Politians Are Causing a Stir This Election Season",
        desc: "Looking for solutions in 2023? Look no further than these two local activist running for office",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/travel_1.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "travel",
        subtype: "standard",
        title: "All Inclusive Trip to Punta Cana Dominican Republic",
        desc: "Punta Cana is pure escape, and its pleasures come in many forms.",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/travel_2.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "travel",
        subtype: "standard",
        title: "See The White Shores of Jamaica ",
        desc: "Jamaica is home to a breathtaking landscape of rolling mountains lined by endless white beaches and cascading waterfalls",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/travel_3.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "travel",
        subtype: "standard",
        title: "Summer Tour of Ancient Egypt",
        desc: "Walk in the footsteps of the Pharaohs on a fascinating city and cruise experience in Egypt.",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/travel_4.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "travel",
        subtype: "standard",
        title: "Romantic Get Away in Paris France",
        desc: "Discover the top sights on our Paris tours including the Louvre, Versailles, Loire Valley, Eiffel Tower, Notre Dame and Musée d'Orsay",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/influencer_1.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "influencer",
        subtype: "standard",
        title: "Marquees Brownlee — Technology Youtuber",
        desc: "Marquees Brownlee is a tech influencer with over 3M views known for his reviews and instructional videos ",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/influencer_2.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "influencer",
        subtype: "standard",
        title: "Tabitha Brown - Food and Lifestyle Influencer",
        desc: "Food and lifestyle influencer well-known for her calm demeanor and comedic cooking videos.",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/influencer_3.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "influencer",
        subtype: "standard",
        title: "Dayna Bolden - Family, Home, Beauty and Fashion",
        desc: "Dayna Bolden is a Host, Model, CEO of Bolden Creative Media, and Beauty and Lifestyle digital content creator based in Baltimore Maryland",
    },
    {
        src: "https://newbucketpj.s3.us-west-1.amazonaws.com/influencer_4.jpg",
        city: "Fresno",
        zip: 93722,
        userid: 1,
        user: "Black Insider",
        type: "influencer",
        subtype: "standard",
        title: "The Angryman - Male Empoowerment",
        desc: "Positive male empowerment, masculinity and entrepreneurship where we deal with unapologetic masculinity",
    },
];

// const categories = [
//     "Housing",
//     "Travel",
//     "Media Influencers",
//     "Education",
//     "Dining",
//     "Business",
//     "Fitness",
// ];
// const subcategories = {
//     Housing: [
//         "Properties for Sale",
//         "Properties for Rent",
//         "Private Rooms",
//         "Commercial Real Estate",
//     ],
//     Travel: ["Summer Vacations", "Winter Vacations", "Summer Camps", "Cruises"],
//     "Media Influencers": [
//         "Brand Ambassadors",
//         "Social Media Influencers",
//         "Podcast",
//     ],
//     Education: [
//         "Home-School Teachers",
//         "Tutors",
//         "Finance",
//         "1 on 1 Coaching",
//         "Vocational Schools",
//         "Charter Schools",
//     ],
//     Dining: ["Restaurants", "Catering", "Halal", "Kosher"],
//     Business: [
//         "Financial Services",
//         "Business Services",
//         "Brand Management",
//         "Legal Services",
//         "Credit Services",
//         "Banking",
//     ],
//     Fitness: [
//         "Certified Personal Trainers",
//         "Classes",
//         "Gyms",
//         "Fitness Groups",
//         "Dance",
//     ],
// };
//     userid INTEGER REFERENCES users(id),\
//     type varchar(50),\
//     title varchar(250),\
//     description varchar(500),\
//     zip varchar(100),\
//     likes INTEGER,\
//     shares INTEGER,\
//     bookmarks INTEGER,\
//     city varchar(150),\
//     creationdate TIMESTAMP)",

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

    // Listings table create
    // client.query(
    //     "CREATE TABLE listings(id SERIAL PRIMARY KEY,\
    //     userid INTEGER REFERENCES users(id),\
    //     category INTEGER REFERENCES category(id),\
    //     subcategory INTEGER REFERENCES subcategory(id),\
    //     title varchar(250),\
    //     description varchar(500),\
    //     body varchar(3000), \
    //     zip varchar(100),\
    //     likes INTEGER,\
    //     shares INTEGER,\
    //     bookmarks INTEGER,\
    //     city varchar(150),\
    //     creationdate TIMESTAMP)",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    // Category table create
    // client.query(
    //     "CREATE TABLE category(id SERIAL PRIMARY KEY, val varchar(50))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    // Subcategory table create
    // client.query(
    //     "CREATE TABLE subcategory(val, )(id SERIAL PRIMARY KEY,categoryid INTEGER REFERENCES category(id), val varchar(50))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    //Media table
    // client.query(
    //     "CREATE TABLE media(id SERIAL PRIMARY KEY,\
    //     type varchar(20),\
    //     format varchar(20),\
    //     postid INTEGER REFERENCES listing(id),\
    //     url varchar(250))",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );

    // city: "Fresno",
    // zip: 93722,
    // userid: 1,
    // src: "https://newbucketpj.s3.us-west-1.amazonaws.com/politics_4.jpg",
    // user: "Black Insider",
    // type: "politics",
    // subtype: "standard",
    // title: "Why These Two California Politians Are Causing a Stir This Election Season",
    // desc: "Looking for solutions in 2023? Look no further than these two local activist running for office",

    const createValues = async () => {
        for await (const {
            city,
            zip,
            userid,
            src,
            user,
            type,
            subtype,
            title,
            desc,
        } of businessArr) {
            const data = await client.query(
                "INSERT INTO listings(userid, category, subcategory, title, \
                description, zip, likes, shares, bookmarks, city, creationdate)\
                 VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
                [userid, 1, 1, title, desc, zip, 0, 0, 0, city, new Date()]
            );
            console.log(data.rows[0].id);
            const media = await client.query(
                "INSERT INTO media(type, format, listing_id, url, main) VALUES($1, $2, $3, $4, $5)",
                ["image", ".jpg", data.rows[0].id, src, true]
            );
        }
    };

    //createValues();
    // categories.forEach((it) => {
    //     client.query("INSERT INTO category(val) VALUES($1)", [it]);
    // });

    // const createSubCategories = async (rows) => {
    //     for await (const { id, val } of rows) {
    //         for (const it of subcategories[val]) {
    //             client.query(
    //                 "INSERT INTO subcategory(categoryid, val) VALUES($1, $2)",
    //                 [id, it]
    //             );
    //         }
    //     }
    // };

    // client.query("SELECT * FROM category", (e, r) => {
    //     console.log(r.rows[0]);
    // });

    // client.query("SELECT * FROM subcategory", (e, r) => {
    //     console.log(r.rows[0]);
    // });

    // client.query("DELETE FROM media", (er, resp) => {
    //     console.log(resp.rows, " REsponse... ");
    //     client.query("DELETE FROM listings", (er, resp) => {
    //         console.log(resp.rows, " REsponse... ");
    //     });
    // });

    // client.query("DROP TABLE listing");

    // client.query("SELECT * FROM users", (er, resp) => {
    //     console.log(resp.rows, " User... ");
    // });

    // client.query("UPDATE USERS set email = 'caroham29@gmail.com' WHERE id = 2");

    // client.query(
    //     "ALTER TABLE media ADD COLUMN listing_id INTEGER REFERENCES listings(id)",
    //     (err, resp) => {
    //         if (err) {
    //             console.log(err, " Error ");
    //         } else {
    //             console.log(resp, " SUCCESS ");
    //         }
    //     }
    // );
});
