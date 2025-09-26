const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

const catsRoutes = require("./routes/cats.routes");
const todosRoutes = require("./routes/todos.routes");
const authRoutes = require("./routes/auth.routes"); // JWT

app.use(cors());
app.use(express.json());

app.use("/cats", catsRoutes);
app.use("/todos", todosRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello Aleksandra World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
