const MovieModel = require("../models/movieModel")

const getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
    }
};

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

const addMovie = async (req, res) => {
    try {
        const movieData = req.body;
        await MovieModel.create(movieData);
        res.status(200).send("The movie has been successfully added");
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message });
    }
};

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

module.exports = { getAllMovies, getMovieById, deleteMovie, addMovie, updateMovie };