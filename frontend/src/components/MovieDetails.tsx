import React from "react";
import { Link } from "react-router-dom";
import { useMoviesContext } from "../hooks/useMoviesContext";
import { IMovie } from "../interfaces/interfaces";

interface IProps {
  movie: IMovie;
}

export const MovieDetails = (props: IProps) => {
  const { movie } = props;
  const { dispatch } = useMoviesContext();

  const handleDelete = async () => {
    const response = await fetch("/api/movies/" + movie._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MOVIE", payload: json });
    }
  };

  return (
    <div className="movie-details">
      <Link to={`/movies/${movie.imdbID}`}>
        <img src={movie.poster} alt="" />
      </Link>
      <div className="movie-details-preview">
        <p className="movie-title">{movie.title}</p>
        <p>{`Year: ${movie.release}`}</p>
        <p>{`Type: ${movie.type}`}</p>
        <p className="movie-review">
          <strong>Review:</strong>
          <br />
          {movie.review}

          {/* {movie.review.length > 50
            ? `${movie.review.slice(0, 49)}...`
            : movie.review} */}
        </p>
        <span className="material-symbols-outlined" onClick={handleDelete}>
          delete
        </span>
      </div>
    </div>
  );
};
