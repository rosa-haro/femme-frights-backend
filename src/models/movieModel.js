const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    titleEnglish: {
      type: String,
      required: [true, "The title is required"],
      minlength: [1, "The title must have at least 1 character"],
      maxlength: [150, "The title cannot exceed 150 characters"],
      trim: true,
    },
    titleOriginal: {
      type: String,
      minlength: [1, "The original title must have at least 1 character"],
      maxlength: [150, "The original title cannot exceed 150 characters"],
      trim: true,
    },
    director: {
      type: String,
      required: [true, "The director is required"],
      minlength: [2, "The director's name must have at least 2 characters"],
      maxlength: [100, "The director's name cannot exceed 100 characters"],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, "The release year is required"],
      min: [1895, "The year must be later than 1895"], // 1895 was the year of the first recorded film
      max: [new Date().getFullYear(), "The year cannot be in the future"], // To dynamically set the current year
    },
    poster: {
      type: String,
      required: [true, "TMDB movie ID is required"],
      trim: true,
    },
    overview: {
      type: String,
      minlength: [10, "The overview must have at least 10 characters"],
      maxlength: [2000, "The overview cannot exceed 2000 characters"],
      trim: true,
    },
    duration: {
      hours: {
        type: Number,
        required: true,
        min: [0, "Hours cannot be negative"],
        max: [10, "A movie rarely exceeds 10 hours"],
      },
      minutes: {
        type: Number,
        required: true,
        min: [0, "Minutes cannot be negative"],
        max: [59, "Minutes must be between 0 and 59"],
      },
    },
    mainCast: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((actor) => actor.trim().length > 1 && actor.length < 100);
        },
        message: "Each actor's name must be between 2 and 100 characters",
      },
    },
  });

const MovieModel = mongoose.model("Movie", movieSchema, "movies")

module.exports = MovieModel