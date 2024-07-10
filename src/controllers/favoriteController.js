const { markFavorite, getFavorites, unmarkFavorite } = require('../services/favoriteService');
const { successResponse } = require('../utils/commonUtils');

exports.markFavorite = async (req, res) => {
    const { movie_id } = req.body;
    const user_id = req.user.id;

    try {
        const favorite = await markFavorite(user_id, movie_id);
        const response = successResponse(favorite);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.getFavorites = async (req, res) => {
    const user_id = req.user.id;

    try {
        const favorites = await getFavorites(user_id);
        const response = successResponse(favorites);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.unmarkFavorite = async (req, res) => {
    const app = 'abc'
    const { movie_id } = req.body;
    const user_id = req.user.id;

    try {
        const result = await unmarkFavorite(user_id, movie_id);
        const response = successResponse(result);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
