import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const apiUrl = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    const queryFromParams = searchParams.get("query") ?? "";
    setQuery(queryFromParams);
  }, [searchParams]);

  const fetchMovies = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: query,
          language: "en-US",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query) {
      setErrorMessage("Please enter a movie name");
      return;
    }
    setErrorMessage("");
    setSearchParams({ query });
    fetchMovies();
  };

  return (
    <>
      <div className={css.contimputbtn}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter the name of the movie"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
