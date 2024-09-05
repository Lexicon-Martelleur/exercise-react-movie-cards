import React, { ReactElement, ReactNode } from "react";


import styles from "./MovieCardLayout.module.css";

interface Props {
	children?: ReactNode;
}

export const MovieCardLayout: React.FC<Props> = ({
	children
}): ReactElement => {
	return (
		<>
			<header className={styles.header}>
				<h1>Movie Card</h1>
			</header>
			<main className={styles.main}>
				{children}
			</main>
			<footer className={styles.footer}>
				<p>joel.martelleur@gmail.com</p>
			</footer>
		</>
	)
}