import React, { ReactElement, useEffect, useRef } from "react";

import styles from "./MovieCardDialog.module.css"
import { IMovieCard } from "../../../../service";
import { MovieCard } from "../MovieCard/MovieCard";

interface Props {
    open: boolean;
    movieCard: IMovieCard | null;
    onClose: () => void;
    onConfirmation: () => void;
}

export const MovieCardDialog: React.FC<Props> = ({
    open,
    movieCard,
    onClose,
    onConfirmation
}): ReactElement => {
    const dialog = useRef<HTMLDialogElement | null>(null)

    useEffect(() => {
        if (dialog.current == null ) { return; }
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);

    return (
        <dialog ref={dialog} className={styles.movieCardDialog}>
            <div className={styles.movieCardDialogBody}>
                <h1>Movie Card Dialog</h1>
                <p>Do you want to use movie card?</p>
                {movieCard != null && <MovieCard
                    movieCard={movieCard}
                    onSelect={onConfirmation}/>
                }
                <button onClick={_ => onClose()}>Close</button>
            </div>
        </dialog>
    );
}
