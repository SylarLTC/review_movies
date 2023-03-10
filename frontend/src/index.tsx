import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { MoviesContextProvider } from "./context/MovieContext";
import { MoviesAPIContextProvider } from "./context/MovieAPIContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MoviesContextProvider>
      <MoviesAPIContextProvider>
        <App />
      </MoviesAPIContextProvider>
    </MoviesContextProvider>
  </React.StrictMode>
);
