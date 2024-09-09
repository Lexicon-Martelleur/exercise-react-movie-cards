import React, { ReactElement } from "react";

import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog";
import { IMovieCardEntity } from "../../../../model";

import styles from "./MovieList.module.css";
import { useMovieList } from "./useMovieList";

interface Props {
    movieCards: IMovieCardEntity[]
}

export const MovieList: React.FC<Props> = ({
    movieCards
}): ReactElement => {
    const movieListHook = useMovieList();

    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieCards.map(movieCardEnity =>
                <MovieCard
                    key={movieCardEnity.id}
                    movieCardEntity={movieCardEnity}
                    onSelect={movieListHook.handleSelectMovieCard}/>
            )}
            <MovieCardDialog
                open={movieListHook.isMovieCardDialogOen}
                movieCardEntity={movieListHook.selectedMovieCard}
                onClose={movieListHook.handleCloseMovieCardDialog}
                onConfirm={movieListHook.handleConfirm}/>
        </section>
    );
}
