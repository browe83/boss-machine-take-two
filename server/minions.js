const express = require("express");
const minionsRouter = express.Router();
const db = require("./db");

minionsRouter.param("minionId", (req, res, next, id) => {
  const minion = db.getFromDatabaseById("minions", id);
  req.minionId = id;

  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send("Minion ID not found");
  }
});

minionsRouter.get("/", (req, res, next) => {
  console.log("get all minions request received");
  res.send(db.getAllFromDatabase("minions"));
});

minionsRouter.get("/:minionId", (req, res, next) => {
  console.log("minion id get request received");
  res.send(req.minion);
});

minionsRouter.post("/", (req, res, next) => {
  console.log("minions post request received");
  const newMinion = req.body;
  db.addToDatabase("minions", newMinion);
  res.status(201).send(newMinion);
});

minionsRouter.put("/:minionId", (req, res, next) => {
  console.log("minions post request received");
  const updatedMinion = req.body;
  db.updateInstanceInDatabase("minions", updatedMinion);
  res.status(201).send(updatedMinion);
});

minionsRouter.delete("/:minionId", (req, res, next) => {
  console.log("minions delete request received");
  db.deleteFromDatabasebyId("minions", req.minionId);
  console.log(req.minion);
  res
    .status(201)
    .send(
      `Minion: ${
        req.minion
      } successfully deleted. Remaining minions: ${db.getAllFromDatabase(
        "minions"
      )}`
    );
});
module.exports = minionsRouter;
