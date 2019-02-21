
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {Name: "Pancakes"},
        {name: "Fried Chicken"},
        {name: "Stir-Fry"}
      ]);
    });
};
