import React, { ReactElement } from "react";

import { IMovieCard } from "../../../../service";
import styles from "./MovieCard.module.css";
import { StarRating } from "../StarRating";

interface Props {
    movieCard: IMovieCard;
}

export const MovieCard: React.FC<Props> = ({
    movieCard
}): ReactElement => {
    return (
        <article className={styles.movieCardArticle}>
            <h3>{movieCard.title} | {movieCard.genre}</h3>
            <StarRating rating={movieCard.rating} size="small"/>
            <p>{movieCard.description}</p>
        </article>
    );
}
