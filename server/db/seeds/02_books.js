exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {title: 'Harry Potter And The Sorcerer\'s Stone', author: 1, isbn: '9780439362139', format: 'Paperback', pages: 324},
        {title: 'The Road', author: 7, isbn: '9780307265432', format: 'Hardcover', pages: 241},
        {title: 'The Handmaid\'s Tale', author: 13, isbn: '9780098765432', format: 'Hardcover', pages: 312},
        {title: 'Never Let Me Go', author: 31, isbn: '9799998765432', format: 'Hardcover', pages: 312},
        {title: 'Becoming', author: 3, isbn: '9799998761234', format: 'Paperback', pages: 357},
        {title: 'Conversations with Friends', author: 2, isbn: '9700008761234', format: 'Paperback', pages: 248},
        {title: 'Caste', author: 27, isbn: '9700008756734', format: 'Paperback', pages: 420},
        {title: 'Warmth of Other Suns', author: 27, isbn: '9788888756734', format: 'E-book', pages: 465},
        {title: 'To Kill a Mockingbird', author: 18, isbn: '9712345756734', format: 'E-book', pages: 311},
        {title: 'Long Bright River', author: 25, isbn: '9986545756734', format: 'Hardcover', pages: 355},
        {title: 'Spillover', author: 26, isbn: '9712345789014', format: 'Hardcover', pages: 409},
        {title: 'The Bluest Eye', author: 17, isbn: '9719045789014', format: 'Hardcover', pages: 260},
        {title: 'Pride and Prejudice', author: 5, isbn: '9716078789014', format: 'Hardcover', pages: 307},
      ]);

    });
};
