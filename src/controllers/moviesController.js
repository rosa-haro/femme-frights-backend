const MovieModel = require("../models/movieModel")

const getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send({ status: "Failed", error: error.message })
    }
}

module.exports = { getAllMovies }