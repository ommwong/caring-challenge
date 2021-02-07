const { v4: uuidv4 } = require("uuid");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {id: uuidv4(), name: "JK Rowling"},
        {id: uuidv4(), name: "Sally Rooney"},
        {id: uuidv4(), name: "Barack Obama"},
        {id: uuidv4(), name: "Mark Twain"},
        {id: uuidv4(), name: "Jane Austen"},
        {id: uuidv4(), name: "John Grisham"},
        {id: uuidv4(), name: "Cormac McCarthy"}
      ]);
    });
};



