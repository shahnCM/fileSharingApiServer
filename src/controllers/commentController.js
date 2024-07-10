const { addComment, deleteComment } = require('../services/commentService');
const { successResponse } = require('../utils/commonUtils');

exports.addComment = async (req, res) => {
    const { movie_id, comment } = req.body;
    const user_id = req.user.id;

    try {
        const newComment = await addComment(user_id, movie_id, comment);
        const response = successResponse(newComment);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteComment(id);
        const response = successResponse(result);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
