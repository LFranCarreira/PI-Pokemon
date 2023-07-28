import React, { useState } from "react";
import { validateStats } from "./validation";
import axios from "axios";
import styles from "./CreatePokemon.module.css"
import { Link } from "react-router-dom";
import homePokemon from "../../Img/homePokemon.png"
export default function CreatePokemon() {
  const [newPokemon, setNewPokemon] = useState({
    Name: "",
    Image:"",
    Health: "",
    Attack: "",
    Defense: "",
    Speed: undefined,
    Height: undefined,
    Weight: undefined,
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
    const propiedad = event.target.name;
    const value = event.target.value;

    // Convertimos los valores de Speed, Height y Weight a enteros si son proporcionados
    const intValue = ["Speed", "Height", "Weight"].includes(propiedad) ? parseInt(value, 10) : value;

    const aux = { ...newPokemon };
    aux[propiedad] = intValue;
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
    <div className={styles.bg}>
        <div style={{ display: "flex", flexDirection: "column" }}>
        <Link to="/home">
          <img className={`${styles.img} ${styles.scaleButton}`}  src={homePokemon} alt="Home"/>
        </Link>
      <form className={styles.form} onSubmit={submitPokemon}>
        <div className={styles.container}>
          <div>
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
            <div>
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
            <div>
            <span>Health: </span>
            <input
              type="range"
              min="5"
              max="1000"
              name="Health"
              placeholder="Health"
              onBlur={handleBlur}
              value={newPokemon.Health}
              onChange={handlePokemonInfo}
            />
          </div>
          <div>
            <span>Attack: </span>
            <input
              type="range"
              min="5"
              max="1000"
              name="Attack"
              placeholder="Attack"
              onBlur={handleBlur}
              value={newPokemon.Attack}
              onChange={handlePokemonInfo}
            />
          </div>
          <div>
            <span>Defense: </span>
            <input
              type="range"
              min="5"
              max="1000"
              name="Defense"
              placeholder="Defense"
              onBlur={handleBlur}
              value={newPokemon.Defense}
              onChange={handlePokemonInfo}
            />
          </div>
          <div>
            <span>Speed: </span>
            <input
              type="range"
              min="5"
              max="1000"
              name="Speed"
              placeholder="Speed"
              onBlur={handleBlur}
              value={newPokemon.Speed}
              onChange={handlePokemonInfo}
            />
          </div>
          <div>
            <span>Height: </span>
            <input
              type="range"
              min="10"
              max="400"
              name="Height"
              placeholder="Height"
              onBlur={handleBlur}
              value={newPokemon.Height}
              onChange={handlePokemonInfo}
            />
          </div>
          <div>
            <span>Weight: </span>
            <input
              type="range"
              min="10"
              max="400"
              name="Weight"
              placeholder="Weight"
              onBlur={handleBlur}
              value={newPokemon.Weight}
              onChange={handlePokemonInfo}
            />
          </div>
        </div>
        <div>
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
          <div>
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
  );
}