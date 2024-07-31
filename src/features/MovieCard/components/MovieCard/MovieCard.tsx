import React, { ReactElement } from "react";

import { IMovieCard } from "../../../../service";
import styles from "./MovieCard.module.css" 

interface Props {
    movieCard: IMovieCard;
}

export const MovieCard: React.FC<Props> = ({
    movieCard
}): ReactElement => {
    return (
        <article className={styles.movieCardArticle}>
            <h3>TItle: {movieCard.title}</h3>
            <p>Description: {movieCard.description}</p>
            <p>Rating: {movieCard.rating}</p>
            <p>Genre: {movieCard.genre}</p>
        </article>
    )
}
