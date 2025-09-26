import { Box, Button, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const AdminTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchAllTodos = async () => {
    const response = await fetch("http://localhost:3000/todos/admin");
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchAllTodos();
  }, []);

  const toggleDeleted = async (id: string) => {
    await fetch("http://localhost:3000/todos/admin/toggle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAllTodos();
  };

  return (
    <Box>
      <Typography variant="h2">Admin TODO Panel</Typography>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span
              style={{ textDecoration: todo.deleted ? "line-through" : "none" }}
            >
              {todo.title}
            </span>
            <Button
              variant="contained"
              color={todo.deleted ? "success" : "error"}
              onClick={() => toggleDeleted(todo.id)}
            >
              {todo.deleted ? "Restore" : "Delete"}
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminTodos;
