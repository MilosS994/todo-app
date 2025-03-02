require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error: ", error));

app.get("/", (req, res) => {
  res.send("Welcome to To-Do App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
