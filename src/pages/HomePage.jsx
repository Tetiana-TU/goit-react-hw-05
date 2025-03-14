import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const apiUrl = "https://api.themoviedb.org/3/movie/popular";

  useEffect(() => {
    axios
      .get(apiUrl, {
        params: {
          api_key: apiKey,
          language: "uk-UA",
          page: 1,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading ? <p>Завантаження...</p> : <MovieList movies={movies} />}
      {error && <p>Помилка: {error}</p>}
    </div>
  );
};

export default HomePage;
