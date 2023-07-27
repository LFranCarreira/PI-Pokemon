import React, { useEffect, useState } from "react";
import styles from "./Filter.module.css";

export default function Filter(props) {
  const { pokemons, setOrderedPokemons } = props;
  const [Order, setOrder] = useState("Ascending");
  const [OrderBy, setOrderBy] = useState("Name");
  const [Show, setShow] = useState("Show all");

  useEffect(() => {
    filterAndSortPokemons();
    // eslint-disable-next-line
  }, [Order, OrderBy, Show, pokemons]);

  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

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

    setOrderedPokemons(filteredPokemons);
  };

  const handleOrderChange = (event) => setOrder(event.target.value);
  const handleSortByChange = (event) => setOrderBy(event.target.value);
  const handleShowChange = (event) => setShow(event.target.value);

  return (
    <div className={styles.container}>
      <select className={styles.selectShow} value={Show} onChange={handleShowChange}>
        <option>Show all</option>
        <option>Show Existing Pokemons</option>
        <option>Show Created Pokemons</option>
      </select>

      <select className={styles.selectSortBy} value={OrderBy} onChange={handleSortByChange}>
        <option disabled selected>
          Sort by
        </option>
        <option value="Types">Types</option>
        <option value="Name">Name</option>
        <option value="Attack">Attack</option>
      </select>

      <select className={styles.selectOrder} value={Order} onChange={handleOrderChange}>
        <option disabled selected>
          Order
        </option>
        <option value="Ascending">Ascending</option>
        <option value="Descending">Descending</option>
      </select>
    </div>
  );
}