import { ReactElement } from "react";

import styles from "./MoviCardLayout.module.css";
import { MovieCardContainer } from "../../features";

export const MovieCardLayout = (): ReactElement => {
  return (
    <>
      <header className={styles.header}>
        <h1>Movie Card</h1>
      </header>
      <main className={styles.main}>
        <MovieCardContainer />
      </main>
      <footer className={styles.footer}>
        <p>joel.martelleur@gmail.com</p>
      </footer>
    </>
  )
}