exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'Harry Potter And The Sorcerer\'s Stone', author: 1, isbn: '9780439362139', format: 'Paperback', pages: 324},
        {title: 'The Road', author: 7, isbn: '9780307265432', format: 'Hardcover', pages: 241},
        {title: 'The Handmaid\'s Tale', author: 13, isbn: '9780098765432', format: 'Hardcover', pages: 312}
      ]);
    });
};
