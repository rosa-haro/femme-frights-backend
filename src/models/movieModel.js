const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title_english: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  title_original: {
    type: String,
  },
  director: {
    type: String,
  },
  year: {
    type: Number,
  },
  poster: {
    type: String,
  },
  overview: {
    type: String,
  },
  duration: {
    type: String, //String??
  },
  main_cast: {
    type: [String],
  },
});

const MovieModel = mongoose.model("Movie", movieSchema, "movies")

module.exports = MovieModel