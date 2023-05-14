const dotenv = require('dotenv').config({ path: '../../../.env' })
const { knexSnakeCaseMappers } = require ('objection')
const { sql_client, mysql_host, mysql_port, mysql_user, mysql_pass, mysql_db_name } = require('../../../config/databaseConfig')

const sqlConnection = {
  host: mysql_host ?? process.env.MYSQL_HOST,
  port: mysql_port ?? process.env.MYSQL_PORT,
  user: mysql_user ?? process.env.MYSQL_USER,
  password: mysql_pass ?? process.env.MYSQL_PASSWORD,
  database: mysql_db_name ?? process.env.MYSQL_DATABASE
}

module.exports = {
  development: {
    client: sql_client ?? process.env.SQL_CLIENT ?? 'mysql2',
    connection: sqlConnection,
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers,
  },
  staging: {
    client: sql_client ?? process.env.SQL_CLIENT ?? 'mysql2',
    connection: sqlConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers,
  },
  production: {
    client: sql_client ?? process.env.SQL_CLIENT ?? 'mysql2',
    connection: sqlConnection,
    pool: {
      min: 10,
      max: 100
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    ...knexSnakeCaseMappers,
  }
}

