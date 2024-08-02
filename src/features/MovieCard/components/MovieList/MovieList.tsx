import { ReactElement, useState } from "react";

import { useMovieCardContext } from "../../context";
import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog";
import { IMovieCardEntity } from "../../../../service";
import { removeMovieCardAction } from "../../state";
import styles from "./MovieList.module.css";

export const MovieList = (): ReactElement => {
    const [dispatchMovieCardAction, movieCardState] = useMovieCardContext();
    const [ isMovieCardDialogOen, setIsMovieCardDialogOpen ] = useState(false);
    const [selectedMovieCard, setSelecteMovieCard] = useState<IMovieCardEntity | null>(null);
    
    const handleSelectMovieCard = (movieCard: IMovieCardEntity) => {
        if (selectedMovieCard == null) { return; }
        setSelecteMovieCard(movieCard);
        setIsMovieCardDialogOpen(true);
    }

    const handleCloseMovieCardDialog = () => {
        setIsMovieCardDialogOpen(false);
        setSelecteMovieCard(null);
    }

    const handleConfirm = () => {
        if (selectedMovieCard == null) { return; }
        dispatchMovieCardAction(removeMovieCardAction(selectedMovieCard.id));
        setIsMovieCardDialogOpen(false);
        setSelecteMovieCard(null);
    }

    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieCardState.movieCards.map(movieCardEnity =>
                <MovieCard
                    key={movieCardEnity.id}
                    movieCardEntity={movieCardEnity}
                    onSelect={handleSelectMovieCard}/>
            )}
            <MovieCardDialog
                open={isMovieCardDialogOen}
                movieCardEntity={selectedMovieCard}
                onClose={handleCloseMovieCardDialog}
                onConfirm={handleConfirm}/>
        </section>
    );
}
