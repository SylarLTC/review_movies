import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { MovieForm } from "./pages/MovieForm";
import { useMoviesContext } from "./hooks/useMoviesContext";

export const App = () => {
  const [title, setTitle] = useState<string>("");
  const {movies} = useMoviesContext();
  return (
    <div className="App">
      <BrowserRouter>
        <Header title={title} setTitle={setTitle} movies={movies} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home title={title} />} />
            <Route path="/movies/:imdbId" element={<MovieForm moviesMDB={movies} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};
