import { useState } from "react";

import { IMovieCardEntity } from "../../../../model";

export const useMovieList = () => {
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
        setIsMovieCardDialogOpen(false);
        setSelectedMovieCard(null);
    }

    return {
        isMovieCardDialogOen,
        selectedMovieCard,
        handleSelectMovieCard,
        handleCloseMovieCardDialog,
        handleConfirm
    }
}