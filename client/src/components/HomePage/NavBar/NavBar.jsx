import axios from "axios";
import { useState } from "react";
import { useHistory} from "react-router-dom";
import styles from "./NavBar.module.css";
import homePokemon from "../../../Img/homePokemon.png"
import { Link } from "react-router-dom";
export default function NavBar() {
  // State to store the search input value
  const [search, setSearch] = useState("");

  const history = useHistory();

  // Event handler for input change
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Function to search for a Pokemon
  const searchPokemon = () => {
    if (search === "") {
      alert("Please enter the name of the Pokemon.");
    } else {
       // Redirect to loading page while fetching data
      history.push("/loading");
      axios
        .get("http://localhost:3001/pokemons?name=" + search.toLowerCase())
        .then((response) => {
          // Redirect to the detail page of the found Pokemon
          history.push("/detail/" + response.data.ID);
        })
        .catch((error) => {
          const message = error.response.data.error;
          const status = error.response.status;
          history.push(`/Error?message=${message}status${status}`);
        });
      }
    };
    
  // Function to navigate to the Create Pokemon page
  const createPokemon = () => {
    history.push("/createPokemon");
  };

  return (
    <div className={styles.container}>
          <Link to="/home">
            <img className={styles.img} src={homePokemon} alt="Home" />
          </Link>
      <div className={styles.divSpan}>
        <button className={styles.buttonCreate} onClick={createPokemon}>
          <span>Create your pokemon</span>
        </button>
      </div>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          type="text"
          onChange={handleChange}
          placeholder="Find your pokemon"
          value={search}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchPokemon();
            }
          }}
        ></input>
        <button className={styles.button} onClick={searchPokemon}>
          Search
        </button>
      </div>
    </div>
  );
}