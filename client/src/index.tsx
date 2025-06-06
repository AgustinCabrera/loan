import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
