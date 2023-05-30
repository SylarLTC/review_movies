import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useMoviesContext } from "./hooks/useMoviesContext";
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { MovieForm } from "./pages/MovieForm";

export const App = () => {
  const [title, setTitle] = useState<string>("");
  const { movies } = useMoviesContext();
  const {user} = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Header title={title} setTitle={setTitle} movies={movies} />
        <div className="pages">
          <Routes>
            <Route path="/" element={user ? <Home title={title} /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route
              path="/movies/:imdbId"
              element={<MovieForm moviesMDB={movies} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
