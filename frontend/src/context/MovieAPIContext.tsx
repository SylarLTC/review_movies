import React, { createContext, useReducer } from "react";
import { IMovieAPI } from "../interfaces/interfaces";

interface IContextProps {
  moviesAPI: IMovieAPI[];
  dispatch: ({ type }: { type: string; payload: any }) => void;
}

export const MoviesAPIContext = createContext({} as IContextProps);

export const moviesAPIReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        moviesAPI: action.payload,
      };
    case "CREATE_MOVIE":
      return {
        moviesAPI: [action.payload, ...state.moviesAPI],
      };
    case "DELETE_MOVIE":
      return {
        moviesAPI: state.moviesAPI.filter(
          (movie: any) => movie._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const MoviesAPIContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(moviesAPIReducer, {
    moviesAPI: null,
  });

  return (
    <MoviesAPIContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MoviesAPIContext.Provider>
  );
};
