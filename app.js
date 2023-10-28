const mongoose = require("mongoose");
const csv = require("csv-parser");

const fs = require("fs");
const path = require("path");

const movieModel = require("./models/movie.js");

require("dotenv").config();

(async () => {
  try {
    console.log("Connecting to the database...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the database");
  } catch (error) {
    console.log(
      "Some error occured while connecting to the database :" + error
    );
  }
})();

async function uploadData() {
  await fs
    .createReadStream(path.join(__dirname, ".", "data", "movies_data.csv"))
    .pipe(csv())
    .on("data", async (data) => {
      const movie = new movieModel({
        id: data.id,
        title: data.title,
        Movie_Rating: data.Movie_Rating,
        No_of_Ratings: data.No_of_Ratings,
        Format: data.Format,
        ReleaseYear: data.ReleaseYear,
        MPAA_Rating: data.MPAA_Rating,
        Directed_By: data.Directed_By,
        Starring: data.Starring,
        Price: data.Price,
      });
      await movie.save();
    })
    .on("error", (e) => {
      console.log(e);
    })
    .on("end", async () => {
      const response = await movieModel.find();
      console.log(response);
    });
}

uploadData();
