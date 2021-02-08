
exports.up = function(knex) {
  return knex.schema.createTable('Awards', function (table){
    table.increments();
    table.string('award_name').notNullable();
    table.integer('year').notNullable();
    table.string('author').notNullable().references('name').inTable('Authors');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Awards');
};
