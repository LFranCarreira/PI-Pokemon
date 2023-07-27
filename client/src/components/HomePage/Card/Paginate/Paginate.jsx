import { useEffect, useState } from "react";
import styles from "./Paginate.module.css";

export default function Paginate(props) {
  const { pokemons, setPokemonsRender } = props;
  const [pag, setPag] = useState(0);

  useEffect(() => {
    pokemonsRender();
    // eslint-disable-next-line
  }, [pag]);

  useEffect(() => {
    setPag(0);
  }, [pokemons]);

  const pokemonsRender = () => {
    const indice = pag * 12;
    setPokemonsRender(pokemons.slice(indice, indice + 12));
  };

  const nextPage = () => {
    setPag(pag + 1);
    // Scroll hacia arriba al hacer clic en Next
    window.scrollTo(0, 0);
  };

  const prevPage = () => {
    setPag(pag - 1);
    // Scroll hacia arriba al hacer clic en Prev
    window.scrollTo(0, 0);
  };

  const maxpage = Math.ceil(pokemons.length / 12);

  return (
    <div className={styles.container}>
      <div className={styles.paginate}>
        {pag > 0 && (
          <button onClick={prevPage} className={styles.button}>
            ← Prev
          </button>
        )}
        <span className={styles.span}>Pag {pag + 1} of {maxpage}</span>
        {pag < maxpage - 1 && (
          <button onClick={nextPage} className={styles.button}>
            Next →
          </button>
        )}
      </div>
    </div>
  );
}