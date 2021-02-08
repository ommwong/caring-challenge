exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function (table){
    table.uuid('id').notNullable();
    table.string('name').notNullable().primary();
  })
  .then(function () {
    return knex.schema.createTable('books', function (table){
      table.string('ISBN').notNullable().primary();
      table.string('author').notNullable().references('name').inTable('authors');
      table.string('title').notNullable();
      table.string('format').notNullable();
      table.integer('pages').notNullable();
    });
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('authors');
};
