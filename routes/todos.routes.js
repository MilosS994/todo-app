const express = require("express");
const router = express.Router();
const Todo = require("../models/todo.model");

// Add new todo
router.post("/", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ message: "Title is required" });
  }

  try {
    const toDo = new Todo({ title });
    await toDo.save();
    res.status(201).send({ message: "Todo created succesffully", toDo });
  } catch (error) {
    res.status(500).send({ message: "Error creating Todo", error });
  }
});

// Show all todos
router.get("/", async (req, res) => {
  try {
    const toDos = await Todo.find();
    res.send(toDos);
  } catch (error) {
    res.status(500).send({ message: "Error fetching todos", error });
  }
});

// Delete todo
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const toDo = await Todo.findByIdAndDelete(id);
    if (!toDo) {
      return res.status(404).send({ message: "Todo not found" });
    }
    res.send({ message: "Todo successfully deleted", toDo });
  } catch (error) {
    res.status(500).send({ message: "Error deleting todo", error });
  }
});

// Update todo
router.put("/:id", async (req, res) => {
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
});

module.exports = router;
