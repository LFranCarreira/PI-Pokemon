import { useEffect, useState } from "react";
import styles from "./Paginate.module.css";

export default function Paginate(props) {
  // Destructuring props
  const { pokemons, setPokemonsRender } = props;

  // State to keep track of the current page
  const [pag, setPag] = useState(0);

  // useEffect to update the rendered pokemons whenever the page changes
  useEffect(() => {
    pokemonsRender();
    // eslint-disable-next-line
  }, [pag]);

  // useEffect to reset the page when the list of pokemons changes
  useEffect(() => {
    setPag(0);
  }, [pokemons]);

  // Function to render and update the pokemons displayed based on the current page
  const pokemonsRender = () => {
    const indice = pag * 12;
    setPokemonsRender(pokemons.slice(indice, indice + 12));
  };

  // Function to go to the next page
  const nextPage = () => {
    setPag(pag + 1);
    // Scroll to the top of the page when clicking Next
    window.scrollTo(0, 0);
  };

  // Function to go to the previous page
  const prevPage = () => {
    setPag(pag - 1);
    // Scroll to the top of the page when clicking Prev
    window.scrollTo(0, 0);
  };

  // Calculate the maximum number of pages
  const maxpage = Math.ceil(pokemons.length / 12);

  // Function to handle page selection
  const handlePageSelect = (selectedPage) => {
    setPag(selectedPage);
    // Scroll to the top of the page when selecting a page
    window.scrollTo(0, 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.paginate}>

        {/* Button to go to the previous page */}
        {pag > 0 && (
          <button onClick={prevPage} className={styles.button}>
            ← Prev
          </button>
        )}

        {/* Display the current page and maximum pages */}
        <div className={styles.pagButton}>
          <select
            className={styles.customSelect}
            value={pag}
            onChange={(e) => handlePageSelect(parseInt(e.target.value))}
          >
          {Array.from({ length: maxpage }, (_, index) => (
          <option key={index} value={index}>
            Page {index + 1}
          </option>
          ))}
          </select>  
        </div>
        
        {/* Button to go to the next page */}
        {pag < maxpage - 1 && (
          <button onClick={nextPage} className={styles.button}>
            Next →
          </button>
        )}
      </div>

      {/* Dropdown to select a specific page */}
      
    </div>
  );
}