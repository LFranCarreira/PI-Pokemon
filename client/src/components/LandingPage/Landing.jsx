import React from 'react';
import {Link} from 'react-router-dom';
import pokemonImg from '../../Img/pokemon-logo-png-1421.png'
import styles from './Landing.module.css'

export default function LandingPage(){
    //LandingPage that allow to go to home
    return(
        <div className={styles.bg}>
            <div className={styles.container}>
                <img src={pokemonImg} alt="img did not charge" className={styles.image} />
                <Link to='/home'>
                    <button className={styles.buttonIng}>Let's go!</button>
                </Link>
                <h2 className={styles.author}>By LFranCarreira</h2>
            </div>
        </div>
    )
}