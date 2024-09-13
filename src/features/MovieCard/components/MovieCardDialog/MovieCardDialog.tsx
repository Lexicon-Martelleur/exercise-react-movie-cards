import React, { ReactElement, useRef } from "react";

import { IMovieCardEntity } from "../../../../model";
import { selectTitle } from "../../state";
import { useMovieCardDialog } from "./useMovieCardDialog"; 
import styles from "./MovieCardDialog.module.css";

interface Props {
    open: boolean;
    movieCardEntity: IMovieCardEntity | null;
    onClose: () => void;
    onConfirm: () => void;
}

export const MovieCardDialog: React.FC<Props> = ({
    open,
    movieCardEntity,
    onClose,
    onConfirm
}): ReactElement => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    useMovieCardDialog(dialog, open);
    return (
        <dialog ref={dialog} className={styles.movieCardDialog}>
            <div className={styles.movieCardDialogBody}>
                <h1>Movie card: {movieCardEntity != null && selectTitle(movieCardEntity)}</h1>
                <p>Confirm to use movie card?</p>
                <div className={styles.movieCardDialogFooter}>
                    <button 
                        onClick={() => onConfirm()}
                        data-testid="confirm-btn">
                        Confirm
                    </button>
                    <button 
                        onClick={() => onClose()}
                        data-testid="close-btn">
                        Close
                    </button>
                </div>
            </div>
        </dialog>
    );
};
