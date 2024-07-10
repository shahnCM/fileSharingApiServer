const Favorite = require('../models/Favorite');
const { NotFoundError } = require('../errors/NotFoundError');

const markFavorite = async (user_id, movie_id) => {
    try {
        const favorite = await Favorite.query().insert({
            user_id,
            movie_id
        });
        return favorite;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getFavorites = async (user_id) => {
    try {
        const favorites = await Favorite.query().where({ user_id });
        return favorites;
    } catch (error) {
        throw new Error(error.message);
    }
};

const unmarkFavorite = async (user_id, movie_id) => {
    try {
        const favorite = await Favorite.query().findOne({ user_id, movie_id });
        if (!favorite) {
            throw new NotFoundError('Favorite not found');
        }

        await Favorite.query().delete().where({ user_id, movie_id });
        return { deleted: true };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { markFavorite, getFavorites, unmarkFavorite };
