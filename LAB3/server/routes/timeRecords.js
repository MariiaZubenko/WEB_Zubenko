const router = require("express").Router();
const { TimeRecord } = require("../models/TimeRecord");
const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const userId = token;
    req.user = { _id: userId };
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

router.get("/", auth, async (req, res) => {
  try {
    console.log("GET /api/timerecords");
    const records = await TimeRecord.find({ user: req.user._id });
    res.send(records);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    console.log("POST /api/timerecords");
    const newRecord = new TimeRecord({
      time: req.body.time,
      user: req.user._id,
    });
    await newRecord.save();
    res.send(newRecord);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    console.log("DELETE /api/timerecords");
    await TimeRecord.deleteMany({ user: req.user._id });
    res.send({ message: "All records deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
