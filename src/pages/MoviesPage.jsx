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

  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const apiUrl = "https://api.themoviedb.org/3/search/movie";

  useEffect(() => {
    const queryFromParams = searchParams.get("query") || "";
    setQuery(queryFromParams);
  }, [searchParams]);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
const fetchMovies = async ()=>{
    try {
      const response = await axios.get(apiUrl, {
        params: {
          api_key: apiKey,
          query: query,
          language: "en-US",
        },
      });
      setMovies(response.data.results);
      setLoading(false);
     
    } catch (error) {
      setLoading(false);
      console.error("Error fetching movies:", error);
    }
  };
  fetchMovies ();
}, [query]);
const handleSearch=()=> {if (!query) return;
  setSearchParams({query});
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
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </>
  );
};

export default MoviesPage;
