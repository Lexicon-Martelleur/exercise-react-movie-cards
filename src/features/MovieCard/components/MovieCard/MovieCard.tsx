import React, { ReactElement } from "react";

import { IMovieCardEntity } from "../../../../model";
import styles from "./MovieCard.module.css";
import { StarRating } from "../StarRating";
import * as State from "../../state";

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
            <h3>{State.selectTitle(movieCardEntity)}</h3>
            <StarRating rating={State.selectRating(movieCardEntity)} size="small"/>
            <time>Created at: {State.selectDateTime(movieCardEntity)}</time>
            <p>{State.selectDescription(movieCardEntity)}</p>          
        </article>
    );
}
