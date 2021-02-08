exports.up = function(knex) {
  return knex.schema.createTable('books', function(table) {
    table.string('ISBN').notNullable().primary();
    table.uuid('author_id').notNullable();
    table.foreign('author_id').references('authors.id');
    table.string('title').notNullable();
    table.string('format').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};
