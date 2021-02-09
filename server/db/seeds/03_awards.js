
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('awards').del()
    .then(function () {
      // Inserts seed entries
      return knex('awards').insert([
        {award: 'Pulitzer Prize for Fiction', author: 7, book: 2, year: 2007},
        {award: 'James Tait Black Memorial Prize', author: 7, book: 2, year: 2006}
      ]);
    });
};
