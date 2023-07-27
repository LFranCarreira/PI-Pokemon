import React from "react";
import TypesTag from "./TypesTag/TypesTag";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import pokeballVacia from "../../../Img/pokeballvacia.png";

export default function Card(props) {
  const { pokemon } = props;
  const { Name, ID, Types, Attack, Image, Defense, Health, Speed } = pokemon;
  const Colors = {
    bug: "#26de81",
    steel:"#3c434a",
    shadow:"#252525",
    dark:"#0b0c14",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#30336b",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#2d3436",
    water: "#0190FF",
  };
  function isUUID(id) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
  
  // Lógica condicional para mostrar el elemento span solo si el ID no es un UUID
  const showID = !isUUID(ID);
  const handleImageError = (e) => {
    e.target.onerror = null; // Evita que se produzca un bucle si hay otro error
    e.target.src = pokeballVacia; // Actualiza la src de la imagen para mostrar el pokeball vacío
  };
  return (
    <div
      className={styles.container}
      style={{
        background: `radial-gradient(circle at 50% 00%, ${
          Colors[Types[0]] ? Colors[Types[0]] : "rgb(192, 198, 255)"
        } 50%, #bababa 50%)`,
      }}
      key={ID}
      
    >
      <div className={styles.title}>
        {showID && <span className={styles.id}>{ID}</span>}
        {!showID && <span className={styles.id}>DB</span>}
          <span className={styles.spanHealth}>
            <span title="Life" className={styles.life}>
              {Health ? Health : "?"}
            </span>         
          <span className={styles.stats}>HP</span>
        </span>
      </div>
      <div className={styles.test}>
        <div className={styles.divImage}>
          <Link to={"/Detail/" + ID}>
          <img
              className={styles.image}
              src={Image ? Image : pokeballVacia}
              alt="pokemon"
              onError={handleImageError} // Maneja el error si la imagen no se carga correctamente
            />
          </Link>
        </div>
      </div>
      <span className={styles.name}>
        {Name ? Name[0].toUpperCase() + Name.slice(1) : "Not registered"}
      </span>
      <div className={styles.divTypes}>
        {Types.map((types) => (
          <div className={styles.divType} key={types + ID}>
            <TypesTag types={types} />
          </div>
        ))}
      </div>
      <div className={styles.stats}>
        <div className={styles.divAttack}>
          <span title="Attack" className={styles.attack}>
            {Attack ? Attack : "?"}
          </span>
          <span className={styles.spanStat}>Attack</span>
        </div>
        <div className={styles.divDefense}>
          <span title="Defense" className={styles.defense}>
            {Defense ? Defense : "?"}
          </span>
          <span className={styles.spanStat}>Defense</span>
        </div>
        <div className={styles.divSpeed}>
          <span title="Speed" className={styles.speed}>
            {Speed ? Speed : "?"}
          </span>
          <span className={styles.spanStat}>Speed</span>
        </div>
      </div>
    </div>
  );
}