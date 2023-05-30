import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { IMovie, IMovieDB } from "../interfaces/interfaces";
import { useAuthContext } from "../hooks/useAuthContext";

interface IProps {
  moviesMDB: IMovie[];
}

export const MovieForm = (props: IProps) => {
  const { moviesMDB } = props;
  const { user } = useAuthContext();

  const location = useLocation();
  const navigate = useNavigate();
  const maxLengthTextarea = 1000;

  const [error, setError] = useState<string | null>(null);

  const [count, setCount] = useState<number>(0);
  const [movie, setMovie] = useState<IMovieDB | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { dispatch } = useMoviesContext();

  const [title, setTitle] = useState(movie?.Title);
  const [poster, setPoster] = useState(movie?.Poster);
  const [type, setType] = useState(movie?.Type);
  const [release, setRelease] = useState(movie?.Year);
  const [imdbID, setImdbID] = useState(movie?.imdbID);

  const isMovie =
    moviesMDB &&
    movie &&
    moviesMDB.filter((movieMDB) => movieMDB.imdbID === movie.imdbID);

  useEffect(() => {
    const text = isMovie && isMovie.length > 0 ? isMovie[0].review : "";
    setReview(text);
  }, [loading]);

  const [review, setReview] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        "/api/movies/searchid/" + location.pathname.slice(8),
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const movieJson = await response.json();

      if (response.ok) {
        setMovie(movieJson);
        setLoading(!loading);
        setTitle(movieJson.Title);
        setPoster(movieJson.Poster);
        setType(movieJson.Type);
        setRelease(movieJson.Year);
        setImdbID(movieJson.imdbID);
      }
    };

    // console.log("render movieForm");

    fetchMovies();
  }, [location.pathname, user]);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const movie = { title, release, type, poster, review, imdbID };

    const response = await fetch("/api/movies/", {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "CREATE_MOVIE", payload: json });
      navigate("/");
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const movie = { title, release, type, poster, review, imdbID };

    const response = await fetch(`/api/movies/${isMovie && isMovie[0]._id}`, {
      method: "PATCH",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_MOVIE", payload: json });
      navigate("/");
    }
  };

  return (
    <div className="movieForm">
      {loading ? (
        <div className="movieForm-loading">
          <p>Loading...</p>
          <p>If you do not want to wait, please reload the page</p>
        </div>
      ) : (
        movie && (
          <form
            onSubmit={
              isMovie && isMovie.length > 0 ? handleUpdate : handleCreate
            }
            className="movieForm-form"
          >
            <div className="movieForm-form-img">
              <img src={movie.Poster} alt="" />
            </div>
            <div className="movieForm-form-content">
              <p className="movie-title">{movie.Title}</p>
              <p>Release: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
              <textarea
                value={review}
                maxLength={maxLengthTextarea}
                onChange={(e) => {
                  setReview(e.target.value);
                  setCount(e.target.value.length);
                }}
              ></textarea>
              <span>{`${count} / ${maxLengthTextarea}`}</span>
              {isMovie && isMovie.length > 0 ? (
                <button className="save-btn">Update</button>
              ) : (
                <button className="save-btn">Save</button>
              )}
            </div>
          </form>
        )
      )}
    </div>
  );
};
