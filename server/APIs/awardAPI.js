const environment = process.env.ENV || 'development';
const config = require('../knexfile')[environment];
const knex = require('knex')(config);

const createAward = (call, callback) => {
  const { award, author, book, year } = call.request;

  const newAward = {
    award: award,
    author: author,
    book: book,
    year: year
  }

  knex('awards')
    .insert(newAward)
    .then(() => {
      callback(null, newAward)
    })
};

const getAwards = (call, callback) => {
  knex('awards')
  .then(data => {
    callback(null, {
      awards: data
    })
  })
};

const getAward = (call, callback) => {
  const { award, year } = call.request

  const existingAward = {
    award: award,
    year: year
  }

  if (existingAward) {
    knex('awards')
      .where(existingAward)
      .then(data => {
        if (data.length) {
          callback(null, data[0]);
        } else {
          callback('Award does not exist');
        }
      })
  }
};

const updateAward = (call, callback) => {

};

const deleteAward = (call, callback) => {

};

module.exports = {
  createAward,
  getAwards,
  getAward,
  updateAward,
  deleteAward
}