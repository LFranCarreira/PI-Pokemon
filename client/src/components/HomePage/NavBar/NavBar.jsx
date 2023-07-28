import axios from "axios";
import { useState } from "react";
import { useHistory} from "react-router-dom";
import styles from "./NavBar.module.css";
import homePokemon from "../../../Img/homePokemon.png"
import { Link } from "react-router-dom";
export default function NavBar() {
  const [search, setSearch] = useState("");

  const history = useHistory();

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const searchPokemon = () => {
    if (search === "") {
      alert("Please enter the name of the Pokemon.");
    } else {
      history.push("/loading");
      axios
        .get("http://localhost:3001/pokemons?name=" + search.toLowerCase())
        .then((response) => {
          history.push("/detail/" + response.data.ID);
        })
        .catch((error) => {
          const message = error.response.data.error;
          const code = error.response.status;
          history.push(`/Error?menssge=${message}&code=${code}`);
        });
    }
  };

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