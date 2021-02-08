
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {ISBN: '9780439362139', author: 'JK Rowling', title: 'Harry Potter And The Sorcerer\'s Stone', format: 'Paperback', pages: 324},
        {ISBN: '9781524763138', author: 'Michelle Obama', title: 'Becoming', format: 'Hardcover', pages: 450},
        {ISBN: '9780307265432', author: 'Cormac McCarthy', title: 'The Road', format: 'Hardcover', pages: 241},
        {ISBN: '9780141439518', author: 'Jane Austen', title: 'Pride and Prejudice', format: 'Hardcover', pages: 116},
      ]);
    });
};
