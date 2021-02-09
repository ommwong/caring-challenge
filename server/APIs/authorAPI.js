const environment = process.env.ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

const createAuthor = (call, callback) => {
  const author = {
    name: call.request.name
  }

  knex('authors')
    .insert(author)
    .then(() => {
      callback(null, author)
    })
};

const getAuthors = (call, callback) => {
  knex('authors')
    .then(data => {
      callback(null, {
        authors: data
      })
    })
};

const getAuthor = (call, callback) => {
  const author = {
    name: call.request.name
  }

  if (author) {
    knex('authors')
      .where(author)
      .then(data => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('The author does not exist');
        }
      })
  }
};

const updateAuthor = (call, callback) => {
  const author = {
    name: call.request.name
  };

  knex('authors')
    .where(author)
    .update({
      name: call.request.updatedName
    })
    .returning()
    .then(data => {
      if (data) {
        callback(null, data)
      } else {
        callback('Author does not exist')
      }
    })
};

const deleteAuthor = (call, callback) => {
  const author = {
    name: call.request.name
  };

  knex('authors')
    .where(author)
    .delete()
    .returning()
    .then(data => {
      if (data) {
        callback(null, data);
      } else {
        callback('Author does not exist');
      }
    })
};

const getAuthorsBooksAwards = (call, callback) => {
  knex('authors')
    .join('books', 'authors.author_id', '=', 'books.author')
    .select('authors.name', 'books.title')
    .then(data => {
      if (data) {
        console.log(data)
        callback(null, data);
      } else {
        callback('Data does not exist')
      }
    })
}

module.exports = {
  createAuthor,
  getAuthors,
  getAuthor,
  updateAuthor,
  deleteAuthor,
  getAuthorsBooksAwards
}