import { ReactElement, useEffect } from "react";

import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog";

import { useMovieList } from "./useMovieList";
import styles from "./MovieList.module.css";
import { useMovieCardContext } from "../../context";
import { useMovieQuery } from "../../hooks";
import { ErrorModal, Loader } from "../../../../components";

export const MovieList = (): ReactElement => {
    const movieListHook = useMovieList();
    const [dispatchMovieAction, movieState] = useMovieCardContext();
    const movieQueryHook = useMovieQuery(dispatchMovieAction)

    useEffect(() => {
        movieQueryHook.getTodos();
    }, [movieQueryHook.getTodos]);

    if (movieState.isError) {
        return <ErrorModal
            title={"Error"}
            message={movieState.errorMsg}
            onClose={movieQueryHook.clearErrorState} />
    }

    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieQueryHook.isPending()
                ? <Loader />
                : movieState.movieCards.map(movieCardEnity =>
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
