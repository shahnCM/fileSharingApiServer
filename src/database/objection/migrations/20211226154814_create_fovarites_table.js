exports.up = async (knex) => {
    return knex.schema.createTableIfNotExists('favorites', table => {
        table.increments('id').primary().unsigned();
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('movie_id').unsigned().notNullable().references('id').inTable('movies').onDelete('CASCADE');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('favorites');
};
