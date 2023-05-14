const { Model } = require('objection');
const { localeTime } = require('../../../utils/commonUtils');

class File extends Model {
    static tableName = 'files'
    static idColumn = 'id'

    $beforeInsert() {
        this.created_at = localeTime()
        this.updated_at = localeTime()
    }
    
    $beforeUpdate() {
        this.updated_at = localeTime()
    }
}

exports.File = File
