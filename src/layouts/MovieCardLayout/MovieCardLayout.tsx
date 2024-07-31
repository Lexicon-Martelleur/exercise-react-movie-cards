import { ReactElement } from "react";

import styles from "./MoviCardLayout.module.css"

export const MovieCardLayout = (): ReactElement => {
  return (
    <>
      <header className={styles.header}>
        <h1>Movie Card</h1>
      </header>
      <main className={styles.main}></main>
      <footer className={styles.footer}>
        <p>joel.martelleur@gmail.com</p>
      </footer>
    </>
  )
}