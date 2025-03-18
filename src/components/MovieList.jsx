
import { Link, useLocation  } from "react-router-dom";
import css from "./MovieList.module.css";
import PropTypes from "prop-types";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <div className={css.movieList}>
      {movies.map((movie) => (
        <div key={movie.id} className={css.movieItem}>
          <Link to={`/movies/${movie.id}`}
          state={{from: location}}>
            <h2>{movie.title}</h2>
            {movie.genres && movie.genres.length > 0 && (
              <h4>{movie.genres.map((genre) => genre.name).join(", ")}</h4>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
};
MovieList.propTypes = {
  movies: PropTypes.array.isRequired, // Вказуємо, що movies має бути масивом і є обов'язковим
};
export default MovieList;
