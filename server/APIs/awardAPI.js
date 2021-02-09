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