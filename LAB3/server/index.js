const express = require("express");
const cors = require("cors");
const connection = require("./db");
const timeRecordRoutes = require("./routes/timeRecords");
const userRoutes = require("./routes/users");

const app = express();

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/timerecords", timeRecordRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
