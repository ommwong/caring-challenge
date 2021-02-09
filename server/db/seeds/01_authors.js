exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('authors').del()
    .then(function () {
      // Inserts seed entries
      return knex('authors').insert([
        {name: "JK Rowling"},
        {name: "Sally Rooney"},
        {name: "Michelle Obama"},
        {name: "Mark Twain"},
        {name: "Jane Austen"},
        {name: "John Grisham"},
        {name: "Cormac McCarthy"},
        {name: "John Boyne"},
        {name: "John Green"},
        {name: "Barack Obama"},
        {name: "Jonathan Franzen"},
        {name: "Kurt Vonnegut"},
        {name: "Margaret Atwood"}
      ]);
    });
};
