import React, { ReactElement, useEffect } from "react";

import styles from "./InfoToast.module.css";

interface Props {
    message: string;
    timeInSeconds?: number;
    close?: () => void;
}

export const InfoToast: React.FC<Props> = ({
    message,
    timeInSeconds = 5,
    close = () => {}
}): ReactElement => {
    useEffect(() => {
        const closeTimeout = setTimeout(() => {
            close();
        }, timeInSeconds * 1000);
        return () => {
            clearTimeout(closeTimeout);
        }
    }, []);

    return (
        <article className={styles.infoToastArticle}>
            <p className={styles.infoToastMessage}>{message}</p>
        </article>
    )
}