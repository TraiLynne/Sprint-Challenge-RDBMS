
exports.up = function(knex, Promise) {
    return knex.schema.createTable('projects', tbl => {
        tbl.increments();

        tbl
            .string('name')
            .notNullable();

        tbl
            .string('description')
            .notNullable();

        tbl
            .boolean('completed')
            .notNullable();

        tbl
            .timestamp('createdAt')
            .defaultTo(knex.fn.now());
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('projects');
};
