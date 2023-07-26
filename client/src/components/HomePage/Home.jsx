import PokemonList from "./Card/PokemonList/PokemonList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import Filter from "../FilterBar/FilterBar";

export default function Home() {
  const pokemons = useSelector((state) => state.pokemons);
  const [pk, setPk] = useState([...pokemons]);

  useEffect(() => {
    if (pokemons) setPk(pokemons);
    // eslint-disable-next-line
  }, [pokemons]);


  return (
    <>
      {/* <Filter pokemons={pokemons} setPk={setPk} pk={pk}/> */}
      <PokemonList pokemons={pk} />
    </>
  );
}