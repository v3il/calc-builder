exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('email');
        table.string('password');
        table.string('googleId');
        table.string('facebookId');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
