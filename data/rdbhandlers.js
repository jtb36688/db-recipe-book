const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

module.exports = {
  addDish,
  getDishes,
  getDishRecipes,
  removeDish,
  modifyDish,
  addRecipe,
  getRecipe
};

function addDish(request) {
  return db("dishes").insert(request);
}

function getDishes(id) {
  let query = db("dishes");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, this.getDishRecipes(id)]).then(results => {
      let [dish, recipes] = results;
      if (dish) {
        dish.recipes = recipes;
        return dishToBody(dish);
      } else {
        return null;
      }
    });
  }
  return query;
}

function getRecipe(id) {
  let query = db("recipes");

  if (id && id > 0) {
    query.where("id", id).first();
    return Promise.all([query, getRecipeIngredients(id)]).then(results => {
      let [recipe, ingredients] = results;
      if (recipe) {
        recipe.ingredients = ingredients;
        return recipeToBody(recipe);
      } else {
        return null;
      }
    })
  }
  return query
}

function getRecipeIngredients(id) {
  return db("ingredients")
  .select('ingredients.quantity', 'ingredients.name')
  .where("recipes_id", id)
  .join("recipe_ingredients", 'recipe_ingredients.ingredients_id', '=', 'ingredients.id')
}

function getDishRecipes(id) {
  return db("recipes")
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
  const result = {
    ...recipe
  };
  if (recipe.ingredients) {
    result.ingredients = recipe.ingredients.map(ingredient => ({
      ...ingredient
    }));
  }
  return result;
}
