exports.up = function(knex) {
  return knex.schema.createTable('books', function (table){
    table.increments('book_id');
    table.text('title').notNullable();
    table.integer('author').notNullable().references('author_id').inTable('authors');
    table.string('isbn').notNullable();
    table.string('format').notNullable();
    table.integer('pages').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books');
};