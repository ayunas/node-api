// implement your API here
const express = require("express");
const dbHelper = require("./data/db.js");
const reqBodyParser = express.json();

const server = express();

server.use(reqBodyParser);

server.listen(8000, () => {
  console.log(`\n server listening on port 8000`);
});

server.get("/", (req, res) => {
  res.send("<h1>Welcome to the NODE-API</h1>");
});

server.get("/api/users", (req, res) => {
  dbHelper
    .find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json(err.message));
});

server.get("/api/users/:id", (req, res) => {
  dbHelper
    .findById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err.message));
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.created_at = Date.now();

  dbHelper
    .insert(newUser)
    .then(added => res.status(201).json(added))
    .catch(err => res.status(500).json(err.message));
});

server.delete("/api/users/:id", (req, res) => {
  console.log(req.params);
  dbHelper
    .remove(req.params.id)
    .then(deleted => {
      console.log(deleted);
      res.status(204).send(deleted);
    })
    .catch(err => res.status(500).json(err.message));
});
