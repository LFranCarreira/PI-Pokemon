import styles from "./TypesTag.module.css";
const Colors = {
    bug: "#26de81",
    steel:"#3c434a",
    shadow:"#A20099",
    dark:"#0b0c14",
    dragon: "#4c2882",
    electric: "#fed330",
    fairy: "#FF0069",
    fighting: "#CC3333",
    fire: "#f0932b",
    flying: "#190946",
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
export default function TypesTag(props) {
    const { types } = props;
    return <span className={styles.default} style={{background:Colors[types] }}>{types}</span>;
  }