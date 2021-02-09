exports.up = function(knex) {
  return knex.schema.createTable('awards', function (table){
    table.increments('award_id');
    table.text('award').notNullable();
    table.integer('author').notNullable().references('author_id').inTable('authors');
    table.integer('book').notNullable().references('book_id').inTable('books');
    table.integer('year').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('awards');
};