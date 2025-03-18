import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const apiKey = "3a694353f8738d14f5f72dd344727341";
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    if (movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          params: {
            api_key: apiKey,
          },
        })
        .then((response) => setCast(response.data.cast))
        .catch((err) => console.error(err));
    }
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>
      <ul>
        {cast.map((actor) => (
          <li
            key={`${actor.id}-${actor.name}`}
            style={{ display: "flex", marginBottom: "20px" }}
          >
            {actor.profile_path ? (
              <img
                src={`${imageBaseUrl}${actor.profile_path}`}
                alt={actor.name}
                width={150}
                height={225}
                style={{ marginRight: "10px", borderRadius: "8px" }}
              />
            ) : (
              <p
                style={{
                  width: "150px",
                  height: "225px",
                  marginRight: "10px",
                  backgroundColor: "#ccc",
                  borderRadius: "8px",
                  textAlign: "center",
                  fontSize: "14px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                {actor.name}
              </p>
            )}
            <p>{actor.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
