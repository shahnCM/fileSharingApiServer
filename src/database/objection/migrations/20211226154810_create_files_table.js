exports.up = async (knex) => {
    return knex.schema
        .createTableIfNotExists('files', table => {
            table.increments('id').primary().unsigned()
            table.string('pvt_key', 500).unique().notNullable()
            table.string('pub_key', 500).unique().notNullable()
            table.string('name').notNullable()
            table.string('mimetype').notNullable()
            table.string('storage').notNullable()
            table.string('path').notNullable()
            table.string('downloads').notNullable().defaultTo(0)
            table.timestamps(true, true)
            // table.uuid('uuid_file').notNullable().defaultTo(knex.raw("(UUID())")) // Only works with mysql vr 8
        })
}

exports.down = async (knex) => {
    return knex.schema.dropTableIfExists('files')
}

