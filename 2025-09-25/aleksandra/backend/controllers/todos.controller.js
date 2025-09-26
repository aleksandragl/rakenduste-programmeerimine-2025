const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const todos = [
  {
    id: uuidv4(),
    title: "First Todo",
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

exports.create = [
  body("title").notEmpty().withMessage("Title is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title } = req.body;
    const newTodo = {
      id: uuidv4(),
      title,
      createdAt: Date.now(),
      updatedAt: null,
      deleted: false,
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  },
];

exports.read = (req, res) => {
  res.json(todos.filter((todo) => !todo.deleted));
};

exports.update = (req, res) => {
  const { id, title } = req.body;
  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.title = title;
  todo.updatedAt = Date.now();
  res.json(todo);
};

exports.delete = (req, res) => {
  const { id } = req.body;
  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.deleted = true;
  res.json({ message: "Todo deleted" });
};
