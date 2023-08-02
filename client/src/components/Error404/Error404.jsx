import React from 'react';
import styles from './Error404.module.css';
import { Link } from 'react-router-dom';
import sadPokemon from '../../Img/sadPokemon.gif'
export default function Error404(){
  //if the page or search does not exist, go to Error404
  return (
    <div className={styles.errorContainer}>
      <div className={styles.correctedError}>
        <img
          src={sadPokemon}
          alt="Sad Pokemon"
          className={styles.sadPokemon}
        />
        <h1 className={styles.errorHeading}>Error 404</h1>
        <p className={styles.errorText}>Page not found</p>
        <Link to="/home" className={styles.homeButton}>
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};
