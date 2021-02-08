
exports.up = function(knex) {
  return knex.schema.createTable('Authors', function (table){
    table.uuid('id').notNullable();
    table.string('name').notNullable().primary();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Authors');
};
