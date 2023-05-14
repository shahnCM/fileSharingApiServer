const Knex = require('knex')
const { Model } = require('objection')
const { development } = require('./knexfile')

exports.dbInit = async _ => {
    const knexObj = Knex(development)
    Model.knex(knexObj)

    try {
        const result = await knexObj.raw('SELECT 1+1 as result')
        console.log('\tDatabase connection successful')
    } catch (err) {
        console.error('\tError connecting to database:', err);
        process.exit(1);
    }
}
