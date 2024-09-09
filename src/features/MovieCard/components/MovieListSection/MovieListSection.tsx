import { ReactElement, useCallback, useEffect, useState } from "react";

import { MovieList } from "../MovieList";
import { useMovieQuery } from "../../hooks";
import { IMovieCardEntity } from "../../../../model";
import { ErrorModal, Loader } from "../../../../components";
import { getMovieAPI } from "../../../../config";

import styles from "./MovieListSection.module.css";

export const MovieListSection = (): ReactElement => {
    const movieQueryHook = useMovieQuery();
    const [ movieCards, setMovieCards ] = useState<IMovieCardEntity[]>([])
    const emptyError = "";
    const [ errorMsg, setErrorMsg ] = useState(emptyError);
    const isError = errorMsg !== emptyError;

    useEffect(() => {
        movieQueryHook.getTodos().then(res => {
            const errorMsg = `Could not fetch movie cards from ${getMovieAPI()}`
            res != null ? setMovieCards(res) : setErrorMsg(errorMsg);
        })
    }, [movieQueryHook.getTodos]);

    const clearErrorState = useCallback(() => {
		setErrorMsg(emptyError);
	}, [emptyError]);

	if (isError) {
		return <ErrorModal
			title={"Error"}
			message={errorMsg}
			onClose={clearErrorState} />;
	}

    return (
        <section className={styles.addMovieSection}>
            {movieQueryHook.isPending()
                ? <Loader />
                : <MovieList movieCards={movieCards} />}
        </section>
    );
}
