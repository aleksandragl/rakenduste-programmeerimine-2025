import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./components/Home";
import About from "./components/About";
import Something from "./components/Something";
import { createHashRouter, RouterProvider } from "react-router";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // MUI

const theme = createTheme({
  // Lisada createTheme ja ThemeProvider ja muudan põhivärv enda soovitud värviks.
  palette: {
    primary: {
      main: "#1150d6ff",
    },
    secondary: {
      main: "#443e3eff",
    },
  },
});

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "home", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "something", element: <Something /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
