import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card";

const API_URL = process.env.API_URL;

export default function PokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [filterSource, setFilterSource] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios.get(`${API_URL}/pokemons`).then((response) => {
      setPokemons(response.data);
    });
  }, []);

  useEffect(() => {
    // Filter by type and source
    let filtered = pokemons.filter((pokemon) => {
      if (filterType === "All" || pokemon.Types.includes(filterType)) {
        return filterSource === "All" || pokemon.Source === filterSource;
      }
      return false;
    });

    // Sort
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.Name.localeCompare(b.Name));
    } else {
      filtered.sort((a, b) => b.Name.localeCompare(a.Name));
    }

    setFilteredPokemons(filtered);
  }, [pokemons, filterType, filterSource, sortOrder]);

  // Pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const lastPageIndex = Math.ceil(filteredPokemons.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Filter and sorting options go here */}
      <div className="pokemon-list">
        {paginatedPokemons.map((pokemon) => (
          <Card key={pokemon.ID} pokemon={pokemon} />
        ))}
      </div>
      {/* Pagination buttons go here */}
      <div className="pagination">
        {Array.from({ length: lastPageIndex }).map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={index + 1 === currentPage ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}