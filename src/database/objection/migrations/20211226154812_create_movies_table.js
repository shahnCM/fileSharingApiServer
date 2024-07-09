exports.up = async (knex) => {
    return knex.schema.createTableIfNotExists('movies', table => {
        table.increments('id').primary().unsigned();
        table.string('title', 100).notNullable();
        table.text('description').notNullable();
        table.integer('running_time').notNullable();
        table.string('thumbnail_url', 255).notNullable();
        table.timestamps(true, true);
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('movies');
};
