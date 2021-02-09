const environment = process.env.ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

const createBook = (call, callback) => {
  const book = {
    title: call.request.title,
    author: call.request.author,
    isbn: call.request.isbn,
    format: call.request.format,
    pages: call.request.pages,
  }

  knex('books')
    .insert(book)
    .then(() => {
      callback(null, book)
    })
};

const getBooks = (call, callback) => {
  knex('books')
    .then(data => {
      callback(null, {
        books: data
      })
    })
};

const getBook = (call, callback) => {
  const book = {
    title: call.request.title
  }

  if (book) {
    knex('books')
      .where(book)
      .then(data => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('The book does not exist');
        }
      })
  }
};


const updateBook = (call, callback) => {
  const book = {
    title: call.request.title
  };

  knex('books')
    .where(book)
    .update({
      title: call.request.updatedTitle,
      author: call.request.updatedAuthor,
      isbn: call.request.updatedIsbn,
      format: call.request.updatedBookFormat,
      pages: call.request.updatedPages
    })
    .returning()
    .then(data => {
      if (data) {
        callback(null, data)
      } else {
        callback('Book does not exist')
      }
    })
};

const deleteBook = (call, callback) => {
  const book = {
    title: call.request.title
  };

  knex('books')
    .where(book)
    .delete()
    .returning()
    .then(data => {
      if (data) {
        callback(null, data);
      } else {
        callback('Book does not exist');
      }
    })
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
}