import express from "express";
import mongoose from "mongoose";
import { Todo } from "./models/Todo.js";
import cors from "cors";

const PORT = 8000;
const MONGO_CONNECTION ="";
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database.");
  })
  .catch((err) => {
    console.log("Database connection error: " + err);
  });

app.post("/newTodo", async (req, res) => {
  const reqBody = req.body;
  const createdTodo = new Todo(reqBody);

  const validate = createdTodo.validateSync();

  if (validate?.errors) {
    res.status(400).json({ errors: validate.errors });
  } else {
    createdTodo
      .save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        res.status(500).json({ errors: err });
      });
  }
});

app.get("/getAllTodos", async (req, res) => {
  try {
    const result = await Todo.find().exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errors: err });
  }
});

app.get("/getTodoById", async (req, res) => {
  try {
    const result = await Todo.findById(req.query.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errors: err });
  }
});

app.delete("/deleteTodoById", async (req, res) => {
  try {
    const id = req.query.id;
    const result = await Todo.findByIdAndDelete(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ errors: err });
  }
});

app.patch("/completeTodo", async (req, res) => {
  try {
    const id = req.query.id;
    const todoDoc = await Todo.findById(id);
    if (todoDoc) {
        todoDoc.isCompleted = !todoDoc.isCompleted;
        await todoDoc.save()
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((err) => {
          res.status(500).json({ errors: err });
        });
    }
    else {
        res.status(500).json({ message: "Please enter a valid todo id." });
    }
  } catch (error) {
    res.status(500).json({ errors: err });
  }
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}.`);
});
