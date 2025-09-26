import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo.tsx";

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/todos");
    const data = await response.json();
    setTodos(data.filter((todo: Todo) => !todo.deleted));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const updateTodo = async (id: string) => {
    if (!editingTitle) return;
    await fetch("http://localhost:3000/todos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: editingTitle }),
    });
    setEditingId(null);
    setEditingTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id: string) => {
    await fetch("http://localhost:3000/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  return (
    <Box>
      <Typography variant="h1">Todos</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            {editingId === todo.id ? (
              <>
                <TextField
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateTodo(todo.id)}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span>{todo.title}</span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditingTitle(todo.title);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

export default Todos;
