import React, { ReactElement, useEffect, useRef } from "react";

import styles from "./MovieCardDialog.module.css";
import { IMovieCard } from "../../../../service";

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
    const dialog = useRef<HTMLDialogElement | null>(null);

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
                <h1>Movie card: {movieCard != null && movieCard.title}</h1>
                <p>Confirm to use movie card?</p>
                <div className={styles.movieCardDialogFooter}>
                    <button onClick={_ => onConfirmation()}>Confirm</button>
                    <button onClick={_ => onClose()}>Close</button>
                </div>
            </div>
        </dialog>
    );
}
