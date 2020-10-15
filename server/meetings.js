const express = require("express");
const meetingsRouter = express.Router();
const db = require("./db");

meetingsRouter.get("/", (req, res, next) => {
  console.log("meetings get request received");
  res.send(db.getAllFromDatabase("meetings"));
});

meetingsRouter.post("/", (req, res, next) => {
  console.log("meetings post request received");
  const newMeeting = db.addToDatabase("meetings", db.createMeeting());
  res.status(201).send(newMeeting);
});

meetingsRouter.delete("/", (req, res, next) => {
  console.log("delete meetings request received");
  db.deleteAllFromDatabase("meetings");
  res
    .status(201)
    .send(
      `All meetings successfully deleted. Meetings db empty: ${db.getAllFromDatabase(
        "meetings"
      )}`
    );
});
module.exports = meetingsRouter;
