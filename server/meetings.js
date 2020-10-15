const express = require("express");
const meetingsRouter = express.Router();
const db = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  console.log("meetings get request received");
  res.send(db.getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  console.log("meetings post request received");
  const newMeeting = req.body;
  db.addToDatabase("meetings", newMeeting);
  res.status(201).send(newMeeting);
});

// meetingsRouter.delete("/meetings", (req, res, next) => {

// })
module.exports = meetingsRouter;
