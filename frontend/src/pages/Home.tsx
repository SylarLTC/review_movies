import React, { useEffect } from "react";
import { MovieDetails } from "../components/MovieDetails";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { useAuthContext } from "../hooks/useAuthContext";

interface IProps {
  title: string;
}

export const Home = (props: IProps) => {
  const { title } = props;
  const { movies, dispatch } = useMoviesContext();
  const { user } = useAuthContext();

  const classHome = title.length > 0 ? "hide" : "home";

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch("/api/movies", {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const movieJson = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MOVIES", payload: movieJson });
      }
      // console.log("movieJson:", movieJson);
    };

    // console.log("render movies");

    if (user) {
      fetchMovies();
    }
  }, [dispatch, user]);

  return (
    <div className={classHome}>
      <div className="movies">
        {movies &&
          movies.map((movie) => <MovieDetails key={movie._id} movie={movie} />)}
      </div>
    </div>
  );
};
