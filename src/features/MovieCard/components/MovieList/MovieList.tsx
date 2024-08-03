import { ReactElement } from "react";

import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog";

import { useMovieList } from "./useMovieList";
import styles from "./MovieList.module.css";

export const MovieList = (): ReactElement => {
    const hook = useMovieList();

    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {hook.getMovieCards().map(movieCardEnity =>
                <MovieCard
                    key={movieCardEnity.id}
                    movieCardEntity={movieCardEnity}
                    onSelect={hook.handleSelectMovieCard}/>
            )}
            <MovieCardDialog
                open={hook.isMovieCardDialogOen}
                movieCardEntity={hook.selectedMovieCard}
                onClose={hook.handleCloseMovieCardDialog}
                onConfirm={hook.handleConfirm}/>
        </section>
    );
}
