exports.up = function(knex) {
    return knex.schema.createTable('forms', table => {
        table.increments('id');
        table.string('name').notNullable();
        table.string('config').notNullable();
        table
            .integer('userid')
            .unsigned()
            .index()
            .references('id')
            .inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('forms');
};
