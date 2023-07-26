import React from "react";
import { Link } from "react-router-dom";

export default function Card({ pokemon }) {
  const { Name, ID, Types, Attack, Image, Defense, Health, Speed } = pokemon;

  return (
    <div className="card">
      <img src={Image} alt={Name} />
      <h3>{Name}</h3>
      <p>Types: {Types.join(", ")}</p>
      <Link to={`/pokemon/${ID}`}>View Details</Link>
    </div>
  );
}