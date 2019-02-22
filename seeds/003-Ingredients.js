exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("ingredients").insert([
        { name: "Cup of Peanut Butter", recipe_id: 1, quantity: .5 },
        { name: "Cup of Cream Cheese", recipe_id: 2, quantity: .5},
        { name: "Cup of Flour", recipe_id: 1, quantity: 1  },
        { name: "Cup of Flour", recipe_id: 2, quantity: 1  },
        { name: "Cup of Milk", recipe_id: 1, quantity: 2  },
        { name: "Cup of Milk", recipe_id: 2, quantity: 2  },
        { name: "Lb Chicken", recipe_id: 3, quantity: 1  },
        { name: "Lb Chicken", recipe_id: 4, quantity: 1  },
        { name: "Lb Chicken", recipe_id: 6, quantity: 1  },
        { name: "Tbsp Fry Oil", recipe_id: 3, quantity: 1  },
        { name: "TbspFry Oil", recipe_id: 4, quantity: 1  },
        { name: "TbspFry Oil", recipe_id: 5, quantity: 1  },
        { name: "TbspFry Oil", recipe_id: 6, quantity: 1  },
        { name: "Cup of Stirfry Vegetables", recipe_id: 5, quantity: 1  },
        { name: "Cup of Stirfry Vegetables", recipe_id: 6, quantity: 1  },
      ]);
    });
};
