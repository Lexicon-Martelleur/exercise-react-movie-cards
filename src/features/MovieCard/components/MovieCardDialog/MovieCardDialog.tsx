import React, { ReactElement, useEffect, useRef } from "react";

import styles from "./MovieCardDialog.module.css";
import { IMovieCardEntity } from "../../../../service";
import { selectTitle } from "../../state";

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
                <h1>Movie card: {movieCardEntity != null && selectTitle(movieCardEntity)}</h1>
                <p>Confirm to use movie card?</p>
                <div className={styles.movieCardDialogFooter}>
                    <button onClick={_ => onConfirm()}>Confirm</button>
                    <button onClick={_ => onClose()}>Close</button>
                </div>
            </div>
        </dialog>
    );
}
