const { Model } = require('objection');
const { localeTime } = require('../../../utils/commonUtils');

class Comment extends Model {
    static get tableName() {
        return 'comments';
    }

    static get idColumn() {
        return 'id';
    }

    $beforeInsert() {
        this.created_at = localeTime();
    }
}

module.exports = Comment;
