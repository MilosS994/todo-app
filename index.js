require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const toDoRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.log("MongoDB connection error: ", error));

//   Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authMiddleware, toDoRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to To-Do App!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
