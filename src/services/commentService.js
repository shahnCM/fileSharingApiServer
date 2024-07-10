const Comment = require('../database/objection/models/Comment');
const { NotFoundError } = require('../errors/NotFoundError');

const addComment = async (user_id, movie_id, comment) => {
    try {
        const newComment = await Comment.query().insert({
            user_id,
            movie_id,
            comment
        });
        return newComment;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteComment = async (id) => {
    try {
        const comment = await Comment.query().findById(id);
        if (!comment) {
            throw new NotFoundError('Comment not found');
        }

        await Comment.query().deleteById(id);
        return { deleted: true };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { addComment, deleteComment };
