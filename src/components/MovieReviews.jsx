import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const apiKey = "3a694353f8738d14f5f72dd344727341";

  useEffect(() => {
    if (movieId) {
      axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          params: {
            api_key: apiKey,
          },
        })
        .then((response) => setReviews(response.data.results))
        .catch((err) => console.error(err));
    } else {
      console.error("movieId is undefined");
    }
  }, [movieId]);

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </div>
  );
};

export default MovieReviews;
