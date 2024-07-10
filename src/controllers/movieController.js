const { getAllMovies, getMovieDetails, addMovie, deleteMovie } = require('../services/movieService');
const { successResponse } = require('../utils/commonUtils');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await getAllMovies();
        const response = successResponse(movies);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const movie = await getMovieDetails(id);
        const response = successResponse(movie);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.addMovie = async (req, res) => {
    const { title, description, running_time, thumbnail_url } = req.body;

    try {
        const movie = await addMovie(title, description, running_time, thumbnail_url);
        const response = successResponse(movie);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteMovie(id);
        const response = successResponse(result);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
