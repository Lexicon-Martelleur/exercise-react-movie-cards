import React, { ReactElement } from "react";

import { IMovieCard } from "../../../../service";
import styles from "./MovieCard.module.css";
import { StarRating } from "../StarRating";

interface Props {
    movieCard: IMovieCard;
    onSelect: (movieCard: IMovieCard) => void
}

export const MovieCard: React.FC<Props> = ({
    movieCard,
    onSelect
}): ReactElement => {
    return (
        <article className={styles.movieCardArticle}
            onClick={_ => onSelect(movieCard)}
            title={`Select ${movieCard.title}`}>
            <h3>{movieCard.title} | {movieCard.genre}</h3>
            <StarRating rating={movieCard.rating} size="small"/>
            <p>{movieCard.description}</p>
        </article>
    );
}
