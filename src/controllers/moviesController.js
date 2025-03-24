const MovieModel = require("../models/movieModel");

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await MovieModel.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Get a single movie by its ID
const getMovieById = async (req, res) => {
  try {
    const idMovie = req.params.idMovie;
    const movie = await MovieModel.findById(idMovie);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

// Sort movies alphabetically (by title in English)
const sortMoviesAZ = async (req, res) => {
  try {
    const movies = await MovieModel.find().sort({ titleEnglish: 1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Sort movies by year (oldest to newest)
const sortMoviesByYearAsc = async (req, res) => {
  try {
    const movies = await MovieModel.find().sort({ year: 1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Sort movies by year (newest to oldest)
const sortMoviesByYearDesc = async (req, res) => {
  try {
    const movies = await MovieModel.find().sort({ year: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// Search movies by title in English (case-insensitive, partial match)
const searchMovieByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    if (!title) {
      return res
        .status(400)
        .json({
          status: "Failed",
          message: "Title query parameter is required",
        });
    }

    const movies = await MovieModel.find({
      titleEnglish: { $regex: title, $options: "i" },
    });

    if (movies.length === 0) {
      return res
        .status(404)
        .json({
          status: "Not Found",
          message: "No movies found with that title",
        });
    }

    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ status: "Failed", error: error.message });
  }
};

// THE FOLLOWING ENDPOINTS HAVE NOT BEEN IMPLEMENTED IN THE FRONTEND,
// BUT ARE FUNCTIONAL AND HAVE THEREFORE BEEN LEFT HERE FOR FUTURE 
// IMPLEMENTATION

// Delete a movie by its ID
const deleteMovie = async (req, res) => {
    try {
      const idMovie = req.params.idMovie;
      const movie = await MovieModel.findByIdAndDelete(idMovie);
      if (!movie) {
        return res.status(404).send("Movie not found");
      }
      res.status(200).send("The movie has been successfully deleted");
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };
  
  // Add a new movie
  const addMovie = async (req, res) => {
    try {
      const movieData = req.body;
      await MovieModel.create(movieData);
      res.status(200).send("The movie has been successfully added");
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };
  
  // Update movie details
  const updateMovie = async (req, res) => {
    try {
      const idMovie = req.params.idMovie;
      const newMovie = req.body;
      const movie = await MovieModel.findByIdAndUpdate(idMovie, newMovie, {
        new: true,
      });
      if (!movie) {
        return res.status(404).send("Movie not found");
      }
      res.status(200).send(movie);
    } catch (error) {
      res.status(500).send({ status: "Failed", error: error.message });
    }
  };

module.exports = {
  getAllMovies,
  getMovieById,
  deleteMovie,
  addMovie,
  updateMovie,
  sortMoviesAZ,
  sortMoviesByYearAsc,
  sortMoviesByYearDesc,
  searchMovieByTitle,
};
