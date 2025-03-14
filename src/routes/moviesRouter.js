const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    deleteMovie,
    addMovie,
    updateMovie,
  } = require("../controllers/moviesController");

router.get("/", getAllMovies)
router.get("/:idMovie", getMovieById)

router.delete("/:idMovie", deleteMovie)

router.post("/", addMovie)

router.patch("/:idMovie", updateMovie)

module.exports = router