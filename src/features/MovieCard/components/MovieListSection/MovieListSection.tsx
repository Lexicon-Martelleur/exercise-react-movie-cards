import { ReactElement, useCallback, useEffect, useState } from "react";

import { MovieList } from "../MovieList";
import { useMovieQuery } from "../../hooks";
import { IMovieCardEntity, IPaginationMeta } from "../../../../model";
import { ErrorModal, Loader, PageNavigation } from "../../../../components";
import { getMovieAPI } from "../../../../config";

import styles from "./MovieListSection.module.css";

export const MovieListSection = (): ReactElement => {
    const movieQueryHook = useMovieQuery();
    const [movieCards, setMovieCards ] = useState<IMovieCardEntity[]>([]);
    const emptyError = "";
    const [errorMsg, setErrorMsg ] = useState(emptyError);
    const isError = errorMsg !== emptyError;
    const [pagination, setPagination] = useState<IPaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState(pagination?.PageNr ?? 1);

    const getMovieCards = useCallback(() => {
        movieQueryHook.getMovieCards(currentPage).then(([movieCards, pagination]) => {
            const errorMsg = `Could not fetch movie cards from ${getMovieAPI()}`;
            if (pagination == null) {
                setErrorMsg(errorMsg);
            }
            setMovieCards(movieCards);
            setPagination(pagination);
        });
    }, [
        currentPage,
        movieQueryHook.getMovieCards
    ]);

    useEffect(() => {
        getMovieCards();
    }, [getMovieCards]);
    
    if (isError) {
		return <ErrorModal
			title={"Error"}
			message={errorMsg}
			onClose={() => { setErrorMsg(emptyError); }} />;
	}

    return (
        <section className={styles.addMovieSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieQueryHook.isPending()
                ? <Loader />
                : <> {pagination != null &&
                    <PageNavigation
                        page={currentPage}
                        nrOfPages={pagination.TotalPageCount}
                        onPrev={() => { setCurrentPage(prev => --prev); }}
                        onNext={() => { setCurrentPage(prev => ++prev); }}>
                        <MovieList movieCards={movieCards} />
                    </ PageNavigation>}
                </>
                }
        </section>
    );
};
