
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Awards').del()
    .then(function () {
      // Inserts seed entries
      return knex('Awards').insert([
        {award_name: 'Pulitzer Prize for Fiction', year: 2017, awarded_to: 'Cormac McCarthy'}
      ]);
    });
};
