const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { Client } = require("pg");

require("dotenv").config();

const client = new Client({
  user: process.env.USER_NAME,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

try {
  client.connect();
} catch (e) {
  console.error("error while connecting:" + e);
}

fs.createReadStream(path.join(__dirname, ".", "data", "movies_data.csv"))
  .pipe(csv())
  .on("data", (data) => {
    const insertQuery =
      "INSERT INTO movie VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
    const vals = [
      data.id,
      data.title,
      data.Movie_Rating,
      data.No_of_Ratings,
      data.Format,
      data.ReleaseYear,
      data.MPAA_Rating,
      data.Directed_By,
      data.Starring,
      data.Price,
    ];
    client.query(insertQuery, vals, (e, res) => {
      if (e) {
        console.error("Error inserting data:", e);
      } else {
        console.log("Data: ", res);
      }
    });
  })
  .on("error", (e) => {
    console.log("error:::" + e);
  })
  .on("end", async () => {
    console.log("data uploaded!!!");
    await client.end();
  });
