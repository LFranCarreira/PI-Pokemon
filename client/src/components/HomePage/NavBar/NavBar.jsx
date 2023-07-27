import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const handleChange = (event) => {
      setSearch(event.target.value);
    };
  
    const searchPokemon = () => {
      if (search === "") {
        alert("Please enter the name of the Pokemon.");
      } else {
        navigate("/Loading");
        axios
          .get("/pokemons?name=" + search.toLowerCase())
          .then((response) => {
            navigate("/Detail/" + response.data.ID);
          })
          .catch((error) => {
            const mensaje = error.response.data.error;
            const codigo = error.response.status;
            navigate(`/Error?mensaje=${mensaje}&codigo=${codigo}`);
          });
      }
    };
  
    const createPokemon = () => {
      navigate("/createPokemon");
    };
  return (
    <div className={styles.container}>
      <div className={styles.divLogo}>
      <Link to="/home">
        <button className={styles.button} alt="Home" />
      </Link>
      </div>
      <div className={styles.divSpan}>
     
        <button className={styles.buttonCreate} onClick={createPokemon}>
          <span className={styles.spanCreate}>Create your pokemon</span>
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
        <button className={styles.button} onClick={searchPokemon}>Search</button>
      </div>
    </div>
  );
}