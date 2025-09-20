import { useState } from "react";
import "./App.css";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material"; //MUI

import { Outlet, Link } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="h6">My-App</Typography>
          <Box ml={3}>
            <Button component={Link} to="/home" color="primary">
              Home
            </Button>
            <Button component={Link} to="/about" color="primary">
              About
            </Button>
            <Button component={Link} to="/something" color="primary">
              Something
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={3}>
          <Outlet />
        </Box>
        <Box mt={4} textAlign="center">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <Box mt={2}>
            <Button variant="contained" color="primary">
              MUI nupp töötab
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
