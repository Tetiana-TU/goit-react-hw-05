import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieCast = ({ movieId }) => {
  const [cast, setCast] = useState([]);
  const apiKey = "3a694353f8738d14f5f72dd344727341";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        setCast(response.data.cast);
      });
  }, [movieId]);

  return (
    <div>
      <h3>Акторський склад</h3>
      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
