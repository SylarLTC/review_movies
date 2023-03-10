import { Link } from "react-router-dom";
import { IMovieAPI, IMovie } from "../interfaces/interfaces";

interface IProps {
  movie: IMovieAPI | undefined;
  movies: IMovie[];
}

export const MovieCard = (props: IProps) => {
  const { movie, movies } = props;

  const isMovie =
    movies &&
    movie &&
    movies.filter((movieMDB) => movieMDB.imdbID === movie.imdbID);

  return (
    <div key={movie!.imdbID} className="card">
      <Link to={`/movies/${movie!.imdbID}`} className="card-link-img">
        <img src={movie!.poster} alt="" />
        <div className={isMovie![0] ? "card-link-added" : "hide"}>
          <span className="material-symbols-outlined">task_alt</span>
        </div>
      </Link>
      <p className="card-movie-title">{movie!.title}</p>
      <p>Year: {movie!.release}</p>
      <p>Type: {movie!.type}</p>
    </div>
  );
};
