import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PokemonList from "./Card/PokemonList/PokemonList";
import Filter from "./Filter/Filter";
import Loading from "./../Loading/Loading";
import NavBar from "./NavBar/NavBar";
import { getPokemons } from "../../redux/actions/actions";

// The Home component
export default function Home() {
  
  // Get the list of pokemons from the Redux store using useSelector
  const pokemons = useSelector((state) => state.pokemons);

  // State to store the ordered list of pokemons
  const [orderedPokemons, setOrderedPokemons] = useState([...pokemons]);

  // Create a dispatch function using useDispatch
  const dispatch = useDispatch();

  // Load the list of pokemons from the server when the component mounts
  useEffect(() => {
    dispatch(getPokemons(dispatch));
    // eslint-disable-next-line
  }, []);

  // Update the ordered list of pokemons whenever the 'pokemons' prop changes
  useEffect(() => {
    if (pokemons) setOrderedPokemons(pokemons);
  }, [pokemons]);

  // Function to update the ordered list of pokemons
  const updateOrderedPokemons = (orderedPokemons) => {
    setOrderedPokemons(orderedPokemons);
  };

  // Display a loading component if the list of pokemons is empty
  if (pokemons.length === 0) return <Loading />;

  // Render the Home component
  return (
    <div>
      {/* Render the navigation bar */}
      <NavBar />

      {/* Render the filter component */}
      <Filter
        pokemons={pokemons}
        setOrderedPokemons={updateOrderedPokemons}
        orderedPokemons={orderedPokemons}
      />

      {/* Render the list of pokemons */}
      <PokemonList pokemons={orderedPokemons} />
    </div>
  );
}