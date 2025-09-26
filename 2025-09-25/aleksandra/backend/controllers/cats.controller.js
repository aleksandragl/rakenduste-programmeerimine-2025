const { body, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

exports.create = [
  body("name").notEmpty().withMessage("Name is required"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { name } = req.body;
    const newCat = {
      id: uuidv4(),
      name,
      createdAt: Date.now(),
      updatedAt: null,
      deleted: false,
    };
    cats.push(newCat);
    res.status(201).json(newCat);
  },
];

exports.read = (req, res) => {
  res.json(cats.filter((cat) => !cat.deleted));
};

exports.update = (req, res) => {
  const { id, name } = req.body;
  const cat = cats.find((c) => c.id === id && !c.deleted);
  if (!cat) return res.status(404).json({ message: "Cat not found" });
  cat.name = name;
  cat.updatedAt = Date.now();
  res.json(cat);
};

exports.delete = (req, res) => {
  const { id } = req.body;
  const cat = cats.find((c) => c.id === id && !c.deleted);
  if (!cat) return res.status(404).json({ message: "Cat not found" });
  cat.deleted = true;
  res.json({ message: "Cat deleted" });
};
