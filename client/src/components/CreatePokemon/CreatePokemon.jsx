import React, { useState } from "react";
import { validateStats } from "./validation";
import axios from "axios";
import styles from "./CreatePokemon.module.css"
import NavBar from "../HomePage/NavBar/NavBar"
export default function CreatePokemon() {
  const [newPokemon, setNewPokemon] = useState({
    Name: "",
    Image: "",
    Health: 250,
    Attack: 250,
    Defense: 250,
    Speed: 0,
    Height: 0,
    Weight: 0,
    Types: [""],
  });
  const typesList = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel",
    "grass", "fire", "electric", "water", "psychic", "dragon", "fairy", "unknown", "ice", "shadow", "dark"];
  const [errors, setErrors] = useState({});
  const [types, setTypes] = useState([""]);
  const [selectedType1, setSelectedType1] = useState("");
  const [selectedType2, setSelectedType2] = useState("");

  const handleSelectType1 = (event) => {
    const value = event.target.value;
    setSelectedType1(value);
    setTypes((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[0] = value;
      return newTypes;
    });
  };

  const handleSelectType2 = (event) => {
    const value = event.target.value;
    setSelectedType2(value);
    setTypes((prevTypes) => {
      const newTypes = [...prevTypes];
      newTypes[1] = value;
      return newTypes;
    });
  };

  const handlePokemonInfo = (event) => {
    const props = event.target.name;
    let value = event.target.value;

    if (props === "Name") {
      value = value.toLowerCase();
    }
    const aux = { ...newPokemon };
    aux[props] = value;

    // Validar el campo en tiempo real y actualizar los errores
    const validationResult = validateStats({
      ...newPokemon,
      [props]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [props]: validationResult[props],
    }));

    setNewPokemon(aux);
  };

  const handleBlur = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    const validationResult = validateStats({
      ...newPokemon,
      [input]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [input]: validationResult[input],
    }));
  };

  const submitPokemon = (event) => {
    event.preventDefault();

    const selectedTypes = types.filter((type) => type !== "");
    let height = newPokemon.Height;
    if (height !== 0) {
      height = parseFloat((height / 10).toFixed(1));
    }

    const pokemon = { ...newPokemon, Height: height, Types: selectedTypes };

    const errors = validateStats(pokemon);
    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    axios
      .post("http://localhost:3001/pokemons", pokemon)
      .then(() => {
        alert("Your Pokemon is now alive!");
        window.location.reload();
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <div>
    <NavBar/>
    <div className={styles.bg}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={submitPokemon}>
          <div className={styles.container}>
          <div className={styles.options}>
            <span>Name: </span>
            <input
              pattern="[a-z]+"
              type="text"
              name="Name"
              placeholder="Pokemon name"
              onBlur={handleBlur}
              value={newPokemon.Name}
              onChange={handlePokemonInfo}
             />
            {errors.Name && <span className={styles.error}>{errors.Name}</span>}
            </div>
            <div className={styles.options}>
            <span>Image: </span>
            <input
                type="text"
                name="Image"
                placeholder="Image URL"
                onBlur={handleBlur}
                value={newPokemon.Image}
                onChange={handlePokemonInfo}
             />
              {errors.Image && <span className={styles.error}>{errors.Image}</span>}
            </div>
            <div className={styles.options}>
            <span>Health: </span>
            <input
              type="range"
              min="10"
              max="500"
              name="Health"
              placeholder="Health"
              onBlur={handleBlur}
              value={newPokemon.Health}
              onChange={handlePokemonInfo}
            />
            {errors.Health && <span className={styles.error}>{errors.Health}</span>}
            <span>{newPokemon.Health}</span> {/* Display the current value */}
          </div>
          <div className={styles.options}>
            <span>Attack: </span>
            <input
              type="range"
              min="10"
              max="500"
              name="Attack"
              placeholder="Attack"
              onBlur={handleBlur}
              value={newPokemon.Attack}
              onChange={handlePokemonInfo}
            />
            {errors.Attack && <span className={styles.error}>{errors.Attack}</span>}
            <span>{newPokemon.Attack}</span> {/* Display the current value */}
          </div>
          <div className={styles.options}>
            <span>Defense: </span>
            <input
              type="range"
              min="10"
              max="500"
              name="Defense"
              placeholder="Defense"
              onBlur={handleBlur}
              value={newPokemon.Defense}
              onChange={handlePokemonInfo}
            />
            {errors.Defense && <span className={styles.error}>{errors.Defense}</span>}
            <span>{newPokemon.Defense}</span> {/* Display the current value */}
          </div>
          <div className={styles.options}>
            <span>Speed (optional) : </span>
            <input
              type="number"
              min="0"
              max="500"
              name="Speed"
              placeholder="Speed"
              onBlur={handleBlur}
              value={newPokemon.Speed}
              onChange={handlePokemonInfo}
            />
            {errors.Speed && <span className={styles.error}>{errors.Speed}</span>}
          </div>
          <div className={styles.options}>
            <span>Height (optional) : </span>
            <input
              type="number"
              min="0"
              max="400"
              name="Height"
              placeholder="Height"
              onBlur={handleBlur}
              value={newPokemon.Height}
              onChange={handlePokemonInfo}
            />
            {errors.Height && <span className={styles.error}>{errors.Height}</span>}
          </div>
          <div className={styles.options}>
            <span>Weight (optional) : </span>
            <input
              type="number"
              min="0"
              max="400"
              name="Weight"
              placeholder="Weight"
              onBlur={handleBlur}
              value={newPokemon.Weight}
              onChange={handlePokemonInfo}
            />
            {errors.Weight && <span className={styles.error}>{errors.Weight}</span>}
          </div>
        </div>
        <div className={styles.options}>
            <span>Type 1: </span>
            <select name="Type1" value={selectedType1} onChange={handleSelectType1}>
              <option value="">Select a type</option>
              {typesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.options}>
            <span>Type 2: </span>
            <select name="Type2" value={selectedType2} onChange={handleSelectType2}>
              <option value="">Select a type</option>
              {typesList.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
                
              ))}
            </select>
            {errors.Types && <span className={styles.error}>{errors.Types}</span>}
          </div>
          <button type="submit">
            Create Pokemon
          </button>
      </form>
      </div>
    </div>
    </div>
  );
}