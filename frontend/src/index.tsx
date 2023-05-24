import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { MoviesContextProvider } from "./context/MovieContext";
import { MoviesAPIContextProvider } from "./context/MovieAPIContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <MoviesContextProvider>
      <MoviesAPIContextProvider>
        <App />
      </MoviesAPIContextProvider>
    </MoviesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
