import React, { useState } from "react";
import axios from "axios";
import MovieList from "../components/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const apiUrl = "https://api.themoviedb.org/3/search/movie";

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);

    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: query,
          language: "uk-UA",
        },
      });
      setMovies(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Пошук фільмів</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Пошук фільмів"
      />
      <button onClick={handleSearch}>Шукати</button>

      {loading ? <p>Завантаження...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
