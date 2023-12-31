import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";

export default function Filter(props) {
  // Destructure props
  const { pokemons, setOrderedPokemons } = props;

  // State to manage filter and sorting options
  const [Order, setOrder] = useState("Ascending");
  const [OrderBy, setOrderBy] = useState("ID");
  const [Show, setShow] = useState("Show all");

  // Effect to filter and sort the pokemons based on selected options
  useEffect(() => {
    filterAndSortPokemons();
    // eslint-disable-next-line
  }, [Order, OrderBy, Show, pokemons]);

  // Regular expression to validate UUID format
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  // Function to filter and sort the pokemons based on selected options
  const filterAndSortPokemons = () => {
    let filteredPokemons = [...pokemons];

    switch (Show) {
      case "Show Created Pokemons":
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => typeof pokemon.ID === "string" && uuidRegex.test(pokemon.ID)
        );
        break;
      case "Show Existing Pokemons":
        filteredPokemons = filteredPokemons.filter(
          (pokemon) => typeof pokemon.ID !== "string" || !uuidRegex.test(pokemon.ID)
        );
        break;
      default:
        break;
    }

    if (Order === "Ascending") {
      filteredPokemons.sort((a, b) => {
        if (typeof a[OrderBy] === "string" && typeof b[OrderBy] === "string") {
          return a[OrderBy].localeCompare(b[OrderBy]);
        } else {
          // If the property is not a string, use a basic comparison
          return a[OrderBy] > b[OrderBy] ? 1 : -1;
        }
      });
    } else if (Order === "Descending") {
      filteredPokemons.sort((a, b) => {
        if (typeof a[OrderBy] === "string" && typeof b[OrderBy] === "string") {
          return b[OrderBy].localeCompare(a[OrderBy]);
        } else {
          // If the property is not a string, use a basic comparison
          return b[OrderBy] > a[OrderBy] ? 1 : -1;
        }
      });
    }
    // Update the ordered pokemons in parent component state
    setOrderedPokemons(filteredPokemons);
  };
  
  // Event handlers for select input changes
  const handleOrderChange = (event) => setOrder(event.target.value);
  const handleSortByChange = (event) => setOrderBy(event.target.value);
  const handleShowChange = (event) => setShow(event.target.value);

  return (
    <div className={styles.container}>
      <select className={styles.selectShow} value={Show} onChange={handleShowChange}>
        <option value="Show all">Show all</option>
        <option value="Show Existing Pokemons">Show Existing Pokemons</option>
        <option value="Show Created Pokemons">Show Created Pokemons</option>
      </select>

      <select className={styles.selectSortBy} value={OrderBy} onChange={handleSortByChange}>
        <option disabled value="">
          Sort by
        </option>
        <option value="ID">ID</option>
        <option value="Types">Types</option>
        <option value="Name">Name</option>
        <option value="Attack">Attack</option>
      </select>

      <select className={styles.selectOrder} value={Order} onChange={handleOrderChange}>
        <option disabled value="">
          Order
        </option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
    </div>
  );
}