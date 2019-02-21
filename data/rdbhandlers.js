const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addDish,
  getDishes,
  removeDish,
  modifyDish,
  addRecipe
};

function addDish(request) {
  return db("dishes").insert(request);
}

function getDishes(id) {
  let query = db("dishes");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, this.getDishRecipes(id)]).then(results => {
      let [dish, recipe] = results;
      if (dish) {
        dish.recipe = recipe;
        return this.mapToBody(dish);
      } else {
        return null;
      }
    });
  }
}

function removeDish(id) {
  return db("dishes")
    .where({ id: id })
    .del();
}

async function modifyDish(id, request) {
  const conditional = await db(`dishes`)
    .where("id", Number(id))
    .update(request);
  if (conditional) {
    return getById(id);
  } else {
    return null;
  }
}

function addRecipe(recipe) {}
