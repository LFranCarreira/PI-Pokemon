import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Loading.module.css";

export default function Loading() {
  const history = useHistory();

  // Function that redirects to home
  const redirectToHome = () => {
    history.push("/home");
  };

  // Use the use efect to set the time
  useEffect(() => {
    const timeout = setTimeout(redirectToHome, 5000); 

    // Clear the timeout once it has finished
    return () => clearTimeout(timeout);
    //eslint-disable-next-line
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Loading...</h1>
    </div>
  );
}