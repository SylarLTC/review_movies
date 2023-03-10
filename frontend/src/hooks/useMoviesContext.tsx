import { useContext } from "react";
import { MoviesContext } from "../context/MovieContext";
import { MoviesAPIContext } from "../context/MovieAPIContext";

export const useMoviesContext = () => {
  const context = useContext(MoviesContext);

  if (!context) {
    throw Error(
      "useMoviesContext must be used inside an MoviesContextProvider"
    );
  }
  return context;
};

export const useMoviesAPIContext = () => {
  const context = useContext(MoviesAPIContext);

  if (!context) {
    throw Error(
      "useMoviesAPIContext must be used inside an MoviesContextProvider"
    );
  }
  return context;
};
