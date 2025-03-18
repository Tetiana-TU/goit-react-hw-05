import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import { useParams, useNavigate, NavLink, Outlet } from "react-router-dom";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "en-US",
        },
      })
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div className={css.contimginfo}>
        <div className={css.contImg}>
          <div>
            <NavLink to="/" className={css.goBackLink}>
              Go Back
            </NavLink>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className={css.infomovie}>
          <h1>{movie.title}</h1>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h2>Genres</h2>
          <h3>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Genres not available"}
          </h3>
        </div>
      </div>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default MovieDetailsPage;
