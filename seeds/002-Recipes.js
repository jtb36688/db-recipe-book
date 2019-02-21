
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {name: 'PeanutButter Pancakes'},
        {name: 'CreamCheese Pancakes'},
        {name: 'DeepFried Chicken'},
        {name: 'PanFried Chicken'},
        {name: 'Vegetable Stir-Fry'},
        {name: 'Chicken Stir-Fry'},
      ]);
    });
};
