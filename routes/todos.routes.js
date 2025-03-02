const express = require("express");
const router = express.Router();
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  getCompletedTodos,
  getActiveTodos,
} = require("../controllers/todos.controller");

// Add new todo
router.post("/", createTodo);
// Show all todos
router.get("/", getTodos);
// Delete todo
router.delete("/:id", deleteTodo);
// Update todo
router.put("/:id", updateTodo);
// Filter completed todos
router.get("/completed", getCompletedTodos);
// Filter active todos
router.get("/pending", getActiveTodos);

module.exports = router;
