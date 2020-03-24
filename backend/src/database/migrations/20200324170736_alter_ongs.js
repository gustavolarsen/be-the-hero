
exports.up = function (knex) {
    return knex.schema.alterTable('ongs', function (table) {
        table.unique('email')
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('ongs');

};

