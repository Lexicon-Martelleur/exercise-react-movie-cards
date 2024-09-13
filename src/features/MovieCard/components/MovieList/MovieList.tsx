import React, { ReactElement } from "react";

import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog";
import { IMovieCardEntity } from "../../../../model";

import { useMovieList } from "./useMovieList";

interface Props {
    movieCards: IMovieCardEntity[]
}

export const MovieList: React.FC<Props> = ({
    movieCards
}): ReactElement => {
    const movieListHook = useMovieList();

    return (
        <>
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
        </>
    );
};
