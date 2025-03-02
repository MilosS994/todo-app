const Todo = require("../models/todo.model");
const validator = require("validator");

// Create todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  if (!validator.isLength(title, { min: 3, max: 50 })) {
    return res
      .status(400)
      .json({ error: "Title must be between 3 and 50 characters" });
  }

  try {
    const todo = new Todo({ title });
    await todo.save();
    res.status(201).json({ message: "Todo created successfully", data: todo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create todo", details: error.message });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const toDos = await Todo.find();
    res
      .status(200)
      .json({ message: "Todos fetched successfully", data: todos });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch todos", details: error.message });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully", data: todo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete todo", details: error.message });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const toDo = await Todo.findByIdAndUpdate(
      id,
      { title, completed },
      { new: true, runValidators: true }
    );
    if (!toDo) {
      res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo successfully updated", data: todo });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update todo", details: error.message });
  }
};

// Get completed todos
exports.getCompletedTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res
      .status(200)
      .json({ message: "Completed todos fetched successfully", data: todos });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch completed todos",
      details: error.message,
    });
  }
};

// Get active todos
exports.getActiveTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    res
      .status(200)
      .json({ message: "Pending todos fetched successfully", data: todos });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch pending todos", details: error.message });
  }
};
