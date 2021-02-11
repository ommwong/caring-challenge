
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('awards').del()
    .then(function () {
      // Inserts seed entries
      return knex('awards').insert([
        {award: 'Pulitzer Prize for Fiction', author: 7, book: 2, year: 2007},
        {award: 'James Tait Black Memorial Prize', author: 7, book: 2, year: 2006},
        {award: 'Man Booker Prize', author: 7, book: 2, year: 2006},
        {award: 'New York Times Bestseller', author: 1, book: 1, year: 2006},
        {award: 'Pulitzer Prize for Fiction', author: 7, book: 2, year: 2001},
        {award: 'National Book Award', author: 31, book: 4, year: 2001},
      ]);
    });
};
