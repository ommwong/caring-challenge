
exports.up = function(knex) {
  return knex.schema.createTable('authors', function(table) {
    table.uuid('id').notNullable().primary();
    table.string('name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
