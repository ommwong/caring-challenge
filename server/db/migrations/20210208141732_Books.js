
exports.up = function(knex) {
  return knex.schema.createTable('Books', function (table){
    table.string('ISBN').notNullable();
    table.string('author').notNullable().references('name').inTable('Authors');
    table.string('title').notNullable().primary();
    table.string('format').notNullable();
    table.integer('pages').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Books');
};
