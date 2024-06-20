import React from "react";
import {createRoot} from "react-dom/client";
import Maze from "./maze";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Maze />
  </React.StrictMode>
);
