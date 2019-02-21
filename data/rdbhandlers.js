const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addDish,
  getDishes,
  getDishRecipes,
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
        return dishToBody(dish);
      } else {
        return null;
      }
    });
  }
}

function getDishRecipes(id) {
  return db("recipies")
    .where("dish_id", id)
    .then(recipes => recipes.map(recipe => recipeToBody(recipe)));
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

function addRecipe(request) {
    return db("recipes").insert(request)
}

function dishToBody(dish) {
  const result = {
    ...dish
  };
  if (dish.recipes) {
    result.recipes = dish.recipes.map(recipe => ({
      ...recipe
    }));
  }
  return result;
}

function recipeToBody(recipe) {
  return {
    ...recipe
  };
}
