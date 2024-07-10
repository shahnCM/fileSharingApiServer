const { Model } = require('objection');
const { localeTime } = require('../../../utils/commonUtils');

class Movie extends Model {
    static get tableName() {
        return 'movies';
    }

    static get idColumn() {
        return 'id';
    }

    $beforeInsert() {
        this.created_at = localeTime();
        this.updated_at = localeTime();
    }

    $beforeUpdate() {
        this.updated_at = localeTime();
    }
}

module.exports = Movie;
