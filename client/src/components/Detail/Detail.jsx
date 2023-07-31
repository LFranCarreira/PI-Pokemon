import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TypesTag from "../HomePage/Card/TypesTag/TypesTag";
import pokeballVacia from "../../Img/pokeballvacia.png";
import styles from "./Detail.module.css";
import NavBar from "../HomePage/NavBar/NavBar";
import HealthPokemon from "../../Img/HealthPokemon.png"
import SpeedPokemon from "../../Img/SpeedPokemon.png"
import AttackPokemon from "../../Img/AttackPokemon.png"
import DefensePokemon from "../../Img/DefensePokemon.jpg"
import HeightPokemon from "../../Img/HeightPokemon.png"
import WeightPokemon from "../../Img/WeightPokemon.jpg"

export default function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/pokemons/" + id)
      .then((response) => {
        return setDetail(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
      // eslint-disable-next-line
  }, [id]);

  if (detail === undefined) return <Loading />;
  const Colors = {
    bug: "#26de81",
    steel:"#3c434a",
    shadow:"#A20099",
    dark:"#4B3621",
    dragon: "#ffeaa7",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#CC3333",
    fire: "#f0932b",
    flying: "#81ecec",
    grass: "#00b894",
    ground: "#EFB549",
    ghost: "#a55eea",
    ice: "#74b9ff",
    normal: "#95afc0",
    poison: "#6c5ce7",
    psychic: "#a29bfe",
    rock: "#838579",
    water: "#0190FF",
  };
  const {
    ID,
    Name,
    Defense,
    Speed,
    Types,
    Attack,
    Weight,
    Height,
    Image,
    Health,
  } = detail;
  const handleImageError = (e) => {
    e.target.onerror = null; // Evita que se produzca un bucle si hay otro error
    e.target.src = pokeballVacia; // Actualiza la src de la imagen para mostrar el pokeball vacío
  };
  return (
    <div>
    <NavBar/>
    <div className={styles.container}> 
      <div
        className={styles.card}
        style={{
          background: `linear-gradient(to right, ${Colors[Types[0]] ? Colors[Types[0]] : 'rgb(192, 198, 255)'} 50%, rgba(255, 255, 255) 50%)`,
        }}

      >
        <span className={styles.name}>{Name[0].toUpperCase() + Name.slice(1)}</span>

        <div className={styles.divImage}>
          <img
            className={styles.image}
            src={Image ? Image : pokeballVacia}
            alt="foto pokemon"
            onError={handleImageError}
          />
        </div>
        <span className={styles.stats}>Stats </span>
        <div className={styles.divStats}>
          <div className={styles.divStatistics}>
            <span className={styles.stat}> {Attack ? Attack: "?" } <img className={styles.statsImg} src={AttackPokemon} alt="Attack"/></span>
          </div>
          <div className={styles.divStatistics}>
            <span className={styles.stat}>{Defense ? Defense: "?" } <img className={styles.statsImg} src={DefensePokemon} alt="Defense"/></span>
          </div>
          <div className={styles.divStatistics}>
            <span className={styles.stat}>{Speed ? Speed: "?" } <img className={styles.statsImg} src={SpeedPokemon} alt="Speed"/></span>
          </div>
          <div className={styles.divStatistics}>
            <span className={styles.stat}>{Health ? Health : "?" } <img className={styles.statsImg} src={HealthPokemon} alt="Health"/></span>
          </div>
        </div>
        <span className={styles.specs}>Specs</span>
        <div className={styles.divCharacteristics}>
          <div className={styles.divCharacteristic}>
            
            <span className={styles.characteristic}>{Weight?Weight:"?"} Lb<img src={WeightPokemon} alt="Weight" className={styles.specsImg}/></span>
          </div>
          <div className={styles.divCharacteristic}>
            
            <span className={styles.characteristic}>{Height?Height/10:"?"} M<img src={HeightPokemon} alt="Height" className={styles.specsImg2}/></span>
          </div>
        </div>
        <span className={styles.types}>Types</span>
        <div className={styles.divType}>
          {Types.map((types) => (
            <TypesTag types={types} key={types + ID} />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}