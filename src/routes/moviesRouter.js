const express = require("express");
const router = express.Router();

const {
    getAllMovies,
    getMovieById,
    deleteMovie,
    addMovie,
    updateMovie,
    sortMoviesAZ,
    sortMoviesByYearAsc,
    sortMoviesByYearDesc,
    searchMovieByTitle,
  } = require("../controllers/moviesController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

router.get("/", getAllMovies)
router.get("/:idMovie", getMovieById)

router.get("/sort/alphabetical", sortMoviesAZ)
router.get("/sort/year-asc", sortMoviesByYearAsc)
router.get("/sort/year-desc", sortMoviesByYearDesc)

router.get("/search/title", searchMovieByTitle)

router.delete("/:idMovie", verifyToken, verifyAdmin, deleteMovie)

router.post("/", verifyToken, verifyAdmin, addMovie)

router.patch("/:idMovie", verifyToken, verifyAdmin, updateMovie)

module.exports = router