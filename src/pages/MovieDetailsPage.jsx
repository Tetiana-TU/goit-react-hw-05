import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";
import css from "./MovieDetailsPage.module.css";
const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [castVisible, setCastVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
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
  const toggleCast = () => setCastVisible((prev) => !prev);
  const toggleReviews = () => setReviewsVisible((prev) => !prev);
  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <div className={"css.contimginfo"}>
        <div className={"css.contImg"}>
          <div>
            <Link to="/" className={css.goBackLink}>
              Go Back
            </Link>
          </div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
        </div>

        <div className={"css.infomovie"}>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <h3>
            {movie.genres && movie.genres.length > 0
              ? movie.genres.map((genre) => genre.name).join(", ")
              : "Genres not available"}
          </h3>
        </div>
      </div>

      <div>
        <Link
          to="#"
          className={css.contCastRev}
          onClick={(e) => {
            e.preventDefault(); // Запобігає переходу за посиланням
            toggleCast();
          }}
        >
          {castVisible ? "Go Back" : "Cast"}
        </Link>
        {castVisible && <MovieCast movieId={movieId} />}
      </div>

      <div>
        <Link
          to="#"
          className={css.contCastRev}
          onClick={(e) => {
            e.preventDefault(); // Запобігає переходу за посиланням
            toggleReviews();
          }}
        >
          {reviewsVisible ? "Go Back" : "Reviews"}
        </Link>
        {reviewsVisible && <MovieReviews movieId={movieId} />}
      </div>
    </div>
  );
};
export default MovieDetailsPage;
