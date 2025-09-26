import {
  Box,
  Button,
  List,
  ListItem,
  Typography,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitCat from "./SubmitCat.tsx";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const fetchCats = async () => {
    const response = await fetch("http://localhost:3000/cats");
    const data = await response.json();
    setCats(data.filter((cat: Cat) => !cat.deleted)); // filtreerimine id jargi
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const updateCat = async (id: string) => {
    if (!editingName) return;
    await fetch("http://localhost:3000/cats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name: editingName }),
    });
    setEditingId(null);
    setEditingName("");
    fetchCats();
  };

  const deleteCat = async (id: string) => {
    await fetch("http://localhost:3000/cats", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCats();
  };

  return (
    <Box>
      <Typography variant="h1">Cats</Typography>
      <List>
        {cats.map((cat) => (
          <ListItem
            key={cat.id}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            {editingId === cat.id ? (
              <>
                <TextField
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  size="small"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateCat(cat.id)}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <span>{cat.name}</span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setEditingId(cat.id);
                    setEditingName(cat.name);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteCat(cat.id)}
                >
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};

export default Cats;
