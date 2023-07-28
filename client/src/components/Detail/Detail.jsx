import Loading from "../Loading/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import TypesTag from "../HomePage/Card/TypesTag/TypesTag";
import pokeballVacia from "../../Img/pokeballvacia.png";
import styles from "./Detail.module.css";
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
        return error
      });
      // eslint-disable-next-line
  }, [id]);

  if (detail === undefined) return <Loading />;
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
    <div className={styles.container}>
      <div
        className={styles.carta}
        style={{
          background: `radial-gradient(circle at 50% 00%, ${
            Colors[Types[0]] ? Colors[Types[0]] : "rgb(192, 198, 255)"
          } 50%, #ffffff 50%)`,
        }}
      >
        <span className={styles.nombre}>{Name}</span>

        <div className={styles.divImagen}>
          <img
            className={styles.imagen}
            src={Image ? Image : pokeballVacia}
            alt="foto pokemon"
            onError={handleImageError}
          />
        </div>
        <span className={styles.stats}>Stats: </span>
        <div className={styles.divStats}>
          <div className={styles.divEstadisticas}>
            <span className={styles.stat}> {Attack ? Attack: "?" }</span>
            <span className={styles.spanStat}> Attack:</span>
          </div>
          <div className={styles.divEstadisticas}>
            <span className={styles.stat}>{Defense ? Defense: "?" }</span>
            <span className={styles.spanStat}> Defense:</span>
          </div>
          <div className={styles.divEstadisticas}>
            <span className={styles.stat}>{Speed ? Speed: "?" }</span>
            <span className={styles.spanStat}> Speed:</span>
          </div>
          <div className={styles.divEstadisticas}>
            <span className={styles.stat}>{Health ? Health : "?" }</span>
            <span className={styles.spanStat}> Health:</span>
          </div>
        </div>
        <span className={styles.caracteristicas}>Specs:</span>
        <div className={styles.divCaracteristicas}>
          <div className={styles.divCaracteristica}>
            <span className={styles.spanCaracteristica}>Weight:</span>
            <span className={styles.caracteristica}>{Weight?Weight:"?"} Lb</span>
          </div>
          <div className={styles.divCaracteristica}>
            <span className={styles.spanCaracteristica}>Height:</span>
            <span className={styles.caracteristica}>{Height?Height:"?"} Inches</span>
          </div>
        </div>
        <div className={styles.divTipo}>
          {Types.map((types) => (
            <TypesTag types={types} key={types + ID} />
          ))}
        </div>
      </div>
    </div>
  );
}