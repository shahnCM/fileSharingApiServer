const Movie = require('../models/Movie');
const { NotFoundError } = require('../errors/NotFoundError');

const getAllMovies = async () => {
    try {
        const movies = await Movie.query();
        return movies;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getMovieDetails = async (id) => {
    try {
        const movie = await Movie.query().findById(id);
        if (!movie) {
            throw new NotFoundError('Movie not found');
        }
        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

const addMovie = async (title, description, running_time, thumbnail_url) => {
    try {
        const movie = await Movie.query().insert({
            title,
            description,
            running_time,
            thumbnail_url
        });
        return movie;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteMovie = async (id) => {
    try {
        await Movie.query().deleteById(id);
        return { deleted: true };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getAllMovies, getMovieDetails, addMovie, deleteMovie };
