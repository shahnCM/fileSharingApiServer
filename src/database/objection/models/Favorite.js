const { Model } = require('objection');
const { localeTime } = require('../../../utils/commonUtils');

class Favorite extends Model {
    static get tableName() {
        return 'favorites';
    }

    static get idColumn() {
        return 'id';
    }

    $beforeInsert() {
        this.created_at = localeTime();
    }
}

module.exports = Favorite;
