const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// siuke andmete kogus
let users = [
  { id: 1, name: "Aleksandra", age: 20 },
  { id: 2, name: "John", age: 22 },
];
app.get("/", (req, res) => {
  res.send("Hello Aleksandra!");
});
// luua
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});
// lugeda kõik kasutajad
app.get("/users", (req, res) => {
  res.json(users);
});
// lugeda id järgi
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});
// uuendada
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    Object.assign(user, req.body);
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});
// kustutada
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    res.json(deletedUser[0]);
  } else {
    res.status(404).send("User not found");
  }
});
// Näited  Route parameters
// /users/:userId/books/:bookId
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(`User ${req.params.userId} requested book ${req.params.bookId}`);
});

// /flights/:from-:to
app.get("/flights/:from-:to", (req, res) => {
  res.send(`Flight from ${req.params.from} to ${req.params.to}`);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
