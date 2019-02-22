const express = require("express");
const helmet = require("helmet");
const db = require("./data/rdbhandlers.js");

const server = express();

server.use(express.json());
server.use(helmet());

server.post("/api/dishes", (req, res) => {
  const { name } = req.body;
  const addition = { name };
  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name for your addition" });
  }
  db.addDish(addition)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/dishes", (req, res) => {
  db.getDishes()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/dishes/:id", (req, res) => {
  const { id } = req.params;
  db.getDishes(id)
    .then(found => {
      if (found) {
        res.status(200).json(found);
      } else {
        res.status(404).json({
          error: "Unable to find any entries matching ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.delete("/api/dishes/:id", async (req, res) => {
  const { id } = req.params;
  db.removeDish(id)
    .then(remove => {
      if (remove) {
        res.status(200).json({ message: "successful delete" });
      } else {
        res.status(404).json({
          errormessage: "Unable to find any entry matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.put("/api/dishes/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const changes = { name };
  if (!name) {
    return res
      .status(400)
      .json({ error: "Please provide a name in your changes" });
  }
  db.modifyDish(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({
          errormessage: "Unable to find entry matching the provided ID"
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/recipes", (req, res) => {
  db.getRecipe()
    .then(found => {
      res.status(200).json(found);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

server.get("/api/recipes/:id", (req, res) => {
  const { id } = req.params;
  db.getRecipe(id)
  .then(found => {
    if (found) {
      res.status(200).json(found);
    } else {
      res.status(404).json({
        error: "Unable to find any entries matching ID"
      });
    }
  })
  .catch(({ code, message }) => {
    res.status(code).json({ message });
  });
});

server.post("/api/recipes/", (req, res) => {
  const { name, dish_id } = req.body;
  const addition = { name, dish_id };
  if (!name || !dish_id ) {
    return res
      .status(400)
      .json({ error: "Please provide a name and dish_id for your addition" });
  }
  db.addRecipe(addition)
    .then(add => {
      res.status(201).json(add);
    })
    .catch(({ code, message }) => {
      res.status(code).json({ message });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
