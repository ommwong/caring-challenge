exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'Harry Potter And The Sorcerer\'s Stone', author: 1, ISBN: '9780439362139', format: 'Paperback', pages: 324},
        {title: 'The Road', author: 7, ISBN: '9780307265432', format: 'Hardcover', pages: 241}
      ]);
    });
};
