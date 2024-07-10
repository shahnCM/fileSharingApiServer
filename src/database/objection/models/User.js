const { Model } = require('objection');
const { localeTime } = require('../../../utils/commonUtils');

class User extends Model {
    static tableName = 'users';
    static idColumn = 'id';

    static get Roles() {
        return {
            USER: 'user',
            ADMIN: 'admin',
        };
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
