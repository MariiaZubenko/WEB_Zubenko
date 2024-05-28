const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const router = require("express").Router();
const { User } = require("../models/user");
const { TimeRecord } = require("../models/TimeRecord");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password, birthdate } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      birthdate,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error registering user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user._id;
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

router.get("/profile", async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const userId = token;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const timeRecords = await TimeRecord.find({ user: userId });
    const totalTimeInSeconds = timeRecords.reduce(
      (total, record) => total + record.time,
      0
    );
    const totalTime = formatTime(totalTimeInSeconds);

    const userData = {
      username: user.username,
      email: user.email,
      birthdate: user.birthdate,
      totalTime,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
