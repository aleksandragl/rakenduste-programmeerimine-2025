import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import useLocalStorage from "../hooks/useLocalStorage"; // ühendame hook
import { useState } from "react";

const About = () => {
  const [email, setEmail] = useLocalStorage<string>("userEmail", ""); // email hoiame
  const [message, setMessage] = useState(""); // sõnum ei hoia

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Aleksandra Gluhhova
      </Typography>

      <Typography variant="h6" gutterBottom>
        My Hobbies:
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Cycling" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Traveling" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Coding" />
        </ListItem>
      </List>

      <Box mt={4} p={3} bgcolor="primary.main" borderRadius={2} color="white">
        <Typography variant="h6" gutterBottom>
          Contact
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            value={email}
            onChange={(e) => setEmail(e.target.value)} // salvestame localstorage sisse
          />
          <TextField
            label="Message"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            color="secondary"
            InputLabelProps={{ sx: { color: "white" } }}
            InputProps={{ sx: { color: "white" } }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button variant="contained" color="secondary">
            Send
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default About;
