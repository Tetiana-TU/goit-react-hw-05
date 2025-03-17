import React from "react";
import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <div className={css.movieList}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`}>
            <h3>{movie.title}</h3>
            {movie.genres && movie.genres.length > 0 && (
              <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
