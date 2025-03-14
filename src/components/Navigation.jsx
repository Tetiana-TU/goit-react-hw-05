import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Головна</NavLink>
        </li>
        <li>
          <NavLink to="/movies">Пошук фільмів</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
