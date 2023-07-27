import Card from "../Card";
import Paginate from "../Paginate/Paginate"
import styles from "./PokemonList.module.css"
import { useState,useEffect } from "react";


export default function PokemonList(props) {
  const { pokemons } = props;
  const [pokemonsRender, setPokemonsRender] = useState([...pokemons])
  useEffect(() => {
    if (pokemons) setPokemonsRender(pokemons.slice(0,12));
    // eslint-disable-next-line
  }, [pokemons]);
  

  return (
    <div>
      <div className={styles.allPokemons}>
      {pokemonsRender.map((pokemon) => (
        <div key={pokemon.ID} className={styles.pokemon}>{<Card pokemon={pokemon}/>}</div>
        ))}
      </div>
        <div className={styles.paginate}>
        <Paginate pokemons={pokemons} setPokemonsRender={setPokemonsRender}/>
        </div>
    </div>
  );
}