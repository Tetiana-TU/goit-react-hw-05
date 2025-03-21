import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieList from "../components/MovieList";
import css from "./MoviesPage.module.css";

const apiKey = "3a694353f8738d14f5f72dd344727341";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const END_POINTS = {
  querySearch: "/search/movie",
};
export const fetchMovies = async (query, page = 1) => {
  const res = await axios.get(
    `${END_POINTS.querySearch}?api_key=${apiKey}&page=${page}&query=${query}&language=en-US&include_adult=false`
  );

  return res.data.results;
};

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState("");
  const searchRequest = searchParams.get("query");

  useEffect(() => {
    if (!searchRequest) {
      return;
    }
    const fetchMovie = () => {
      setLoading(true);
      fetchMovies(searchRequest)
        .then((results) => {
          if (!results.length) {
            alert("No movies found!");
          }

          setMovies(results);
        })
        .catch((error) => {
          setError("Ooops. Something went wrong...");
          console.log(error);
        })
        .finally(setLoading(false));
    };
    fetchMovie();
  }, [searchRequest]);
  function handleSearch() {
    if (!query) {
      setErrorMessage("Please enter a movie name");
      return;
    }
    setErrorMessage("");
    setSearchParams({ query });
  }

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
