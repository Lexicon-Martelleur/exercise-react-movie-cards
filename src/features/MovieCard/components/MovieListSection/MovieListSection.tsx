import { ReactElement, useCallback, useEffect, useState } from "react";

import { MovieList } from "../MovieList";
import { useMovieQuery } from "../../hooks";
import { IMovieCardEntity, IPaginationMeta } from "../../../../model";
import { ErrorModal, Loader, PageNavigation } from "../../../../components";
import { getMovieAPI } from "../../../../config";

import styles from "./MovieListSection.module.css";

export const MovieListSection = (): ReactElement => {
    const movieQueryHook = useMovieQuery();
    const [movieCards, setMovieCards ] = useState<IMovieCardEntity[]>([])
    const emptyError = "";
    const [errorMsg, setErrorMsg ] = useState(emptyError);
    const isError = errorMsg !== emptyError;
    const [pagination, setPagination] = useState<IPaginationMeta | null>(null);
    const [currentPage, setCurrentPage] = useState(pagination?.PageNr ?? 1);

    const getMovieCards = useCallback(() => {
        movieQueryHook.getMovieCards(currentPage).then(([movieCards, pagination]) => {
            const errorMsg = `Could not fetch movie cards from ${getMovieAPI()}`
            if (pagination == null) {
                setErrorMsg(errorMsg);
            }
            setMovieCards(movieCards);
            setPagination(pagination);
        })
    }, [movieQueryHook.getMovieCards, getMovieAPI, currentPage])

    useEffect(() => {
        getMovieCards();
    }, [getMovieCards]);

    const clearErrorState = useCallback(() => {
		setErrorMsg(emptyError);
	}, [emptyError]);

	
    const handleNextPage = () => {
        console.log('currentPage', currentPage)
        setCurrentPage(prev => ++prev);
    }

    const handlePrevPage = () => {
        setCurrentPage(prev => --prev);
    }
    
    if (isError) {
		return <ErrorModal
			title={"Error"}
			message={errorMsg}
			onClose={clearErrorState} />;
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
                        onPrev={handlePrevPage}
                        onNext={handleNextPage}>
                        <MovieList movieCards={movieCards} />
                    </ PageNavigation>}
                </>
                }
        </section>
    );
}
