const Todo = require("../models/todo.model");
const validator = require("validator");

// Create todo
exports.createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title || !validator.isLength(title, { min: 3, max: 50 })) {
    return res
      .status(400)
      .send({ message: "Title must be between 3 and 50 characters" });
  }

  try {
    const toDo = new Todo({ title });
    await toDo.save();
    res.status(201).send({ message: "Todo created succesffully", toDo });
  } catch (error) {
    res.status(500).send({ message: "Error creating Todo", error });
  }
};

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const toDos = await Todo.find();
    res.send(toDos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching todos", error });
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.send({ message: "Todo deleted", todo });
  } catch (error) {
    res.status(500).send({ message: "Error deleting todo", error });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, updated } = req.body;

  try {
    const toDo = await Todo.findByIdAndUpdate(
      id,
      { title, updated },
      { new: true, runValidators: true }
    );
    if (!toDo) {
      res.status(404).send({ message: "Todo not found" });
    }
    res.send({ message: "Todo successfully updated", toDo });
  } catch (error) {
    res.status(500).send({ message: "Error updating todo", error });
  }
};

// Get completed todos
exports.getCompletedTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: true });
    res.send(todos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching completed todos", error });
  }
};

// Get active todos
exports.getActiveTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ completed: false });
    res.send(todos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching pending todos", error });
  }
};
