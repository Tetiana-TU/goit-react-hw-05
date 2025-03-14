import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import MovieCast from "../components/MovieCast";
import MovieReviews from "../components/MovieReviews";

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
          language: "uk-UA",
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

  if (loading) return <p>Завантаження...</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <button onClick={handleGoBack}>Go Back</button>

      <MovieCast movieId={movieId} />
      <MovieReviews movieId={movieId} />
    </div>
  );
};

export default MovieDetailsPage;
