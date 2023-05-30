import React, { useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { IMovieAPI, IMovie } from "../interfaces/interfaces";
import { MovieCard } from "./MovieCard";
import { useMoviesAPIContext } from "../hooks/useMoviesContext";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

interface IProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  movies: IMovie[];
}

export const Header = (props: IProps) => {
  const { title, setTitle, movies } = props;
  const location = useLocation();
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const { moviesAPI, dispatch } = useMoviesAPIContext();

  const handleSearchSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const res = await axios.get("/api/movies/search/" + title);

      const movies: IMovieAPI[] = await res.data;

      dispatch({ type: "SET_MOVIES", payload: movies });
      console.log(movies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.pathname !== "/" || title === "") {
      dispatch({ type: "SET_MOVIES", payload: [] });
      setTitle("");
    }
  }, [title, location, dispatch, setTitle]);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <div className="header">
        <Link className="home-btn" to="/" onClick={() => setTitle("")}>
          Home
        </Link>

        <div className="searchBar">
          <form action="" method="get">
            <label htmlFor="searchBarInput">Search a movie:</label>
            <input
              type="search"
              value={title}
              placeholder="Search..."
              id="searchBarInput"
              className="input-search"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />

            <button
              className="search-btn"
              onClick={handleSearchSubmit}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
      <div className="content">
        <div className="cards">
          {moviesAPI &&
            moviesAPI.map((movie) => {
              return (
                <MovieCard key={movie.imdbID} movie={movie} movies={movies} />
              );
            })}
        </div>
      </div>
    </>
  );
};
