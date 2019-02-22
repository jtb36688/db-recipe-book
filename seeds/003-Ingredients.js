exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("ingredients")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("ingredients").insert([
        { name: "Cup of Peanut Butter", quantity: .5 },
        { name: "Cup of Cream Cheese", quantity: .5},
        { name: "Cup of Flour", quantity: 1  },
        { name: "Cup of Milk", quantity: 2  },
        { name: "Lb Chicken", quantity: 1  },
        { name: "Tbsp Fry Oil", quantity: 1  },
        { name: "Cup of Stirfry Vegetables", quantity: 1  },
      ]);
    });
};
