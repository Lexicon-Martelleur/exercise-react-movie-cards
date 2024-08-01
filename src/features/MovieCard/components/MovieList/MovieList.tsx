import { ReactElement, useContext, useState } from "react";

import { MovieCardContext } from "../../context/movieCardContext";
import { MovieCard } from "../MovieCard";
import { MovieCardDialog } from "../MovieCardDialog"
import styles from "./MovieList.module.css";
import { IMovieCard } from "../../../../service";

export const MovieList = (): ReactElement => {
    const [_, movieCardState] = useContext(MovieCardContext);
    const [ isMovieCardDialogOen, setIsMovieCardDialogOpen ] = useState(false);
    const [selectedMovieCard, setSelecteMovieCard] = useState<IMovieCard | null>(null);
    
    const handleSelectMovieCard = (movieCard: IMovieCard) => {
        setSelecteMovieCard(movieCard);
        setIsMovieCardDialogOpen(true);
    }

    const handleCloseMovieCardDialog = () => {
        setIsMovieCardDialogOpen(false);
    }

    const handleConfirmation = () => {
        setIsMovieCardDialogOpen(false);
    }

    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieCardState.movieCards.map(movieCardEnity =>
                <MovieCard
                    key={movieCardEnity.id}
                    movieCard={movieCardEnity.moviecard}
                    onSelect={handleSelectMovieCard}/>
            )}
            <MovieCardDialog
                open={isMovieCardDialogOen}
                movieCard={selectedMovieCard}
                onClose={handleCloseMovieCardDialog}
                onConfirmation={handleConfirmation}/>
        </section>
    );
}
