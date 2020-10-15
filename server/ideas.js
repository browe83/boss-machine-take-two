const express = require("express");
const ideasRouter = express.Router();
const db = require("./db");

ideasRouter.param("ideaId", (req, res, next, id) => {
  const idea = db.getFromDatabaseById("ideas", id);
  req.ideaId = id;

  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send("idea ID not found");
  }
});

ideasRouter.get("/", (req, res, next) => {
  console.log("get all ideas request received");
  res.send(db.getAllFromDatabase("ideas"));
});

ideasRouter.get("/:ideaId", (req, res, next) => {
  console.log("idea id get request received");
  res.send(req.idea);
});

ideasRouter.post("/", (req, res, next) => {
  console.log("ideas post request received");
  const newIdea = req.body;
  db.addToDatabase("ideas", newIdea);
  res.status(201).send(newIdea);
});

ideasRouter.put("/:ideaId", (req, res, next) => {
  console.log("ideas post request received");
  const updatedIdea = req.body;
  db.updateInstanceInDatabase("ideas", updatedIdea);
  res.status(201).send(updatedIdea);
});

ideasRouter.delete("/:ideaId", (req, res, next) => {
  console.log("ideas delete request received");
  db.deleteFromDatabasebyId("ideas", req.ideaId);
  console.log(req.idea);
  res
    .status(201)
    .send(
      `Idea: ${
        req.idea
      } successfully deleted. Remaining ideas: ${db.getAllFromDatabase(
        "ideas"
      )}`
    );
});
module.exports = ideasRouter;
