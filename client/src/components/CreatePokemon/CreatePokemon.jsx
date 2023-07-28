import React, { useState } from "react";
import { validateStats } from "./validation";
import axios from "axios";
import styles from "./CreatePokemon.module.css"
import NavBar from "../HomePage/NavBar/NavBar"
export default function CreatePokemon() {
  const [newPokemon, setNewPokemon] = useState({
    Name: "",
    Image:"",
    Health: 250,
    Attack: 250,
    Defense: 250,
    Speed: 0,
    Height: 0,
    Weight: 0,
    Types: [""],
  });
  const typesList = ["normal","fighting","flying","poison","ground","rock","bug","ghost","steel",
  "grass","fire","electric","water","psychic","dragon","fairy","unknown","ice","shadow","dark"]
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
    const value = event.target.value;
    const aux = { ...newPokemon };
    aux[props] = value;
    setNewPokemon(aux);
  };
  const handleBlur = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    const validationResult = validateStats({
      ...newPokemon,
      [input]: value,
    });
    const aux = { ...errors, [input]: validationResult };
    if (validationResult !== true) {
      setErrors(aux);
    } else {
      delete aux[input];
      setErrors(aux);
    }
  };

  const submitPokemon = (event) => {
    event.preventDefault();
  
    // Eliminamos los valores vacíos de la matriz de tipos
    const selectedTypes = types.filter((type) => type !== "");
  
    const errors = validateStats({ ...newPokemon, Types: selectedTypes });
    if (Object.keys(errors).length !== 0) {
      let error = "";
      for (const problem in errors) {
        error = error + errors[problem] + "\n";
      }
      alert(`You must correct this errors: \n\n${error}`);
    } else {
      const pokemon = { ...newPokemon, Types: selectedTypes };
      axios
        .post("http://localhost:3001/pokemons", pokemon)
        .then(() => {
          alert("Your Pokemon is now alive!");
          window.location.reload();
        })
        .catch((error) => {
          alert(error.response.data.error);
        });
    }
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
          </div>
        <button type="submit">Create Pokemon</button>
      </form>
      </div>
    </div>
    </div>
  );
}