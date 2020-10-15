const express = require("express");
const ideasRouter = express.Router();
const db = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = db.getFromDatabaseById("ideas", id);

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send("idea ID not found");
  }
});

ideasRouter.get("/", (req, res, next) => {
  console.log("get all ideas route");
  res.send(db.getAllFromDatabase("ideas"));
});

ideasRouter.get("/ideaId", (req, res, next) => {
  console.log("idea id get route");
  res.send(req.idea);
});

ideasRouter.get("/", (req, res, next) => {
  res.send(db.getAllFromDatabase("ideas"));
});

ideasRouter.get("/", (req, res, next) => {
  res.send(db.getAllFromDatabase("ideas"));
});

ideasRouter.post("/", (req, res, next) => {
  console.log("ideas post request received");
  const newIdea = req.body;
  db.addToDatabase("ideas", newIdea);
  res.status(201).send(newIdea);
});

module.exports = ideasRouter;
