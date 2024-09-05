import { useState } from "react";

import { useMovieCardContext } from "../../context";
import { IMovieCardEntity } from "../../../../types";
import { removeMovieCardAction } from "../../state";

export const useMovieList = () => {
    const [dispatchMovieCardAction, movieCardState] = useMovieCardContext();
    const [isMovieCardDialogOen, setIsMovieCardDialogOpen ] = useState(false);
    const [selectedMovieCard, setSelectedMovieCard] = useState<IMovieCardEntity | null>(null);
    
    const handleSelectMovieCard = (movieCardEntity: IMovieCardEntity) => {
        setSelectedMovieCard(movieCardEntity);
        setIsMovieCardDialogOpen(true);
    }

    const handleCloseMovieCardDialog = () => {
        setIsMovieCardDialogOpen(false);
        setSelectedMovieCard(null);
    }

    const handleConfirm = () => {
        if (selectedMovieCard == null) { return; }
        dispatchMovieCardAction(removeMovieCardAction(selectedMovieCard.id));
        setIsMovieCardDialogOpen(false);
        setSelectedMovieCard(null);
    }

    const getMovieCards = () => {
        return movieCardState.movieCards 
    }

    return {
        isMovieCardDialogOen,
        movieCardState,
        selectedMovieCard,
        getMovieCards,
        handleSelectMovieCard,
        handleCloseMovieCardDialog,
        handleConfirm
    }
}