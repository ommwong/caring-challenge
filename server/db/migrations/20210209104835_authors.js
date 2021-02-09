
exports.up = function(knex) {
  return knex.schema.createTable('authors', function (table) {
    table.increments('author_id')
    table.string('name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
