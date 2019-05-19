exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("dishes", column => {
      column.increments();
      column.string("name", 100).notNullable();
    })
    .createTable("recipes", column => {
      column.increments();

      column.string("name", 100).notNullable();

      column
        .integer("dish_id")
        .unsigned()
        .references("id")
        .inTable("dishes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("ingredients", column => {
      column.increments();
      column.string("name", 100).notNullable();
      column
        .integer("recipe_id")
        .unsigned()
        .references("id")
        .inTable("recipe")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column.float("quantity").notNullable();
    })
    .createTable("recipe_ingredients", column => {
      column
        .integer("recipes_id")
        .unsigned()
        .references("id")
        .inTable("recipe")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      column
        .integer("ingredients_id")
        .unsigned()
        .references("id")
        .inTable("ingredients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("dishes")
    .dropTableIfExists("recipes")
    .dropTableIfExists("ingredients")
    .dropTableIfExists("recipe_ingredients")
};
