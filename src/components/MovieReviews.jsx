import React, { useState, useEffect } from "react";
import axios from "axios";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const apiKey = "3a694353f8738d14f5f72dd344727341";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
        params: {
          api_key: apiKey,
        },
      })
      .then((response) => {
        setReviews(response.data.results);
      });
  }, [movieId]);

  return (
    <div>
      <h3>Огляди</h3>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>
              {review.author}: {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
