const { Model } = require('objection');
const { localeTime } = require('../utils/commonUtils');

class User extends Model {
    static get tableName() {
        return 'users';
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

module.exports = User;
