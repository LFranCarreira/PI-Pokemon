import PokemonList from "./Card/PokemonList/PokemonList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Filter from "./Filter/Filter";
import Loading from "./../Loading/Loading"
export default function Home() {
  const pokemons = useSelector((state) => state.pokemons);
  const [pk, setPk] = useState([...pokemons]);

  useEffect(() => {
    if (pokemons) setPk(pokemons);
  }, [pokemons]);

  const updateOrderedPokemons = (orderedPokemons) => {
    setPk(orderedPokemons);
  };

  if (pokemons.length === 0) return <Loading />;
  return (
    <div className={styles.bg}>
      <Filter
        pokemons={pokemons}
        setOrderedPokemons={updateOrderedPokemons}
        orderedPokemons={pk}
      />
      <PokemonList pokemons={pk} />
    </div>
  );
}