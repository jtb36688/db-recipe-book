exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipe_ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipe_ingredients").insert([
        { recipes_id: 1, ingredients_id: 1  },
        { recipes_id: 2, ingredients_id: 2  },
        { recipes_id: 1, ingredients_id: 3  },
        { recipes_id: 2, ingredients_id: 3  },
        { recipes_id: 1, ingredients_id: 4  },
        { recipes_id: 2, ingredients_id: 4  },
        { recipes_id: 3, ingredients_id: 5  },
        { recipes_id: 4, ingredients_id: 5  },
        { recipes_id: 6, ingredients_id: 5  },
        { recipes_id: 3, ingredients_id: 6  },
        { recipes_id: 4, ingredients_id: 6  },
        { recipes_id: 5, ingredients_id: 6  },
        { recipes_id: 6, ingredients_id: 6  },
        { recipes_id: 5, ingredients_id: 7  },
        { recipes_id: 6, ingredients_id: 7  },
      ]);
    });
};

