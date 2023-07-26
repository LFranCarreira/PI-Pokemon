import React from "react";
import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Loading...</h1>
    </div>
  );
}