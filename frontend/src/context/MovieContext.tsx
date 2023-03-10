import React, { createContext, useReducer } from "react";
import { IMovie } from "../interfaces/interfaces";

interface IContextProps {
  movies: IMovie[];
  dispatch: ({ type }: { type: string; payload: string[] }) => void;
}

export const MoviesContext = createContext({} as IContextProps);

export const moviesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        movies: action.payload,
      };
    case "CREATE_MOVIE":
      return {
        movies: [action.payload, ...state.movies],
      };
    case "UPDATE_MOVIE":
      return {
        movies: [...state.movies],
      };
    case "DELETE_MOVIE":
      return {
        movies: state.movies.filter(
          (movie: any) => movie._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const MoviesContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(moviesReducer, {
    movies: null,
  });

  return (
    <MoviesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MoviesContext.Provider>
  );
};
