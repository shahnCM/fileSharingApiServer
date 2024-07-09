exports.up = async (knex) => {
    return knex.schema.createTableIfNotExists('users', table => {
        table.increments('id').primary().unsigned();
        table.string('username', 50).unique().notNullable();
        table.string('password', 255).notNullable();
        table.string('role', 10).defaultTo('user');
        table.timestamps(true, true);
    });
};

exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('users');
};
