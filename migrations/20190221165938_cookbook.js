exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("dishes", column => {
      column.increments();
      column.string("name", 100).notNullable();
    })
    .createTable("recipes", column => {
      column.increments();
      column.string("name", 100).notNullable();
      column.integer("dish_id").unsigned()
      .references("id").inTable("dishes")
      .onDelete("CASCADE").onUpdate("CASCADE")
    })
    .createTable("ingredients", column => {
        column.increments();
        column.string("name", 100).notNullable();
      });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("dishes").dropTableIfExists("recipes").dropTableIfExists("ingredients");
};
