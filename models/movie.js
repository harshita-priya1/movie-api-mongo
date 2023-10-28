const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  Movie_Rating: {
    type: Number,
  },
  No_of_Ratings: {
    type: Number,
  },
  Format: {
    type: String,
  },
  ReleaseYear: {
    type: Number,
  },
  MPAA_Rating: {
    type: String,
  },
  Directed_By: {
    type: String,
  },
  Starring: {
    type: String,
  },
  Price: {
    type: Number,
  },
});

module.exports = mongoose.model("movie", movieSchema);
