import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Loading.module.css";

export default function Loading() {
  const history = useHistory();

  // Definimos la función que redirigirá al usuario al "Home"
  const redirectToHome = () => {
    history.push("/home");
  };

  // Utilizamos useEffect para establecer el temporizador
  useEffect(() => {
    const timeout = setTimeout(redirectToHome, 5000); 

    // Limpiar el temporizador cuando el componente se desmonta o actualiza
    return () => clearTimeout(timeout);
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Loading...</h1>
    </div>
  );
}