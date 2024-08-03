import React, { ReactElement } from "react";

import { IMovieCardEntity } from "../../../../service";
import styles from "./MovieCard.module.css";
import { StarRating } from "../StarRating";
import {
    selectDescription,
    selectGenre,
    selectRating,
    selectTitle
} from "../../state";

interface Props {
    movieCardEntity: IMovieCardEntity;
    onSelect: (movieCard: IMovieCardEntity) => void
}

export const MovieCard: React.FC<Props> = ({
    movieCardEntity,
    onSelect
}): ReactElement => {
    return (
        <article className={styles.movieCardArticle}
            onClick={_ => onSelect(movieCardEntity)}
            data-testid="movie-card">
            <h3>{selectTitle(movieCardEntity)} | {selectGenre(movieCardEntity)}</h3>
            <StarRating rating={selectRating(movieCardEntity)} size="small"/>
            <p>{selectDescription(movieCardEntity)}</p>
        </article>
    );
}
