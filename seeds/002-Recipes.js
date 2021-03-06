exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { name: "PeanutButter Pancakes", dish_id: 1 },
        { name: "CreamCheese Pancakes", dish_id: 1 },
        { name: "DeepFried Chicken", dish_id: 2 },
        { name: "PanFried Chicken", dish_id: 2 },
        { name: "Vegetable Stir-Fry", dish_id: 3 },
        { name: "Chicken Stir-Fry", dish_id: 3 }
      ]);
    });
};
