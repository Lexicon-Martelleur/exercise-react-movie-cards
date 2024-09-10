import { useCallback, useState } from "react";

import { createMovieAPI } from "../../../data";
import * as State from "../state";
import { getMovieAPI, isDevelopment } from "../../../config";
import * as Model from "../../../model";
import { mapNewMoviCardEntityToNewMOvieCardDTO } from "../../../utility";

export type MovieAPIHook = ReturnType<typeof useMovieQuery>;

/**
 * A custom hook used as a wrapper for
 * Movie API.
 */
export function useMovieQuery (
    dispatchMovieAction?: React.Dispatch<State.MovieCardActionType>
) {
    const [pending, setPending] = useState(false);
    const isDispatchable = dispatchMovieAction != null;
    const apiEndPoint = getMovieAPI();
    const movieAPi = createMovieAPI(apiEndPoint);

    const handleError = useCallback((
        err: unknown,
        msg: string
    ) => {
        isDevelopment() && console.log(err);
        isDispatchable && dispatchMovieAction(State.updateErrorStateAction(true, msg))
    }, [dispatchMovieAction]);

    const getMovieCards = useCallback(async (
        page: number,
        errorMsg?: string
    ): Promise<[Model.IMovieCardEntity[], Model.IPaginationMeta | null]> => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available movie cards from ${apiEndPoint}`;
        let movieCards: Model.IMovieCardEntity[] = [];
        let pagination: Model.IPaginationMeta | null = null;
        try {
            [movieCards, pagination] = await movieAPi.getMovies(page);
        } catch (err) {
            handleError(err, constructedErrosMsg);
        } finally {
            setPending(false);
            return [movieCards, pagination];
        }
    }, [apiEndPoint, handleError]);

    const getActors = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available actors from ${apiEndPoint}`;
        (async () => {
            try {
                const actors = await movieAPi.getActors();
                isDispatchable && dispatchMovieAction(State.updateSelectableActorsAction(actors));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })()
    }, [apiEndPoint, dispatchMovieAction, handleError]);

    const getDirectors = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available directors from ${apiEndPoint}`;
        (async () => {
            try {
                const directors = await movieAPi.getDirectors();
                isDispatchable && dispatchMovieAction(State.updateSelectableDirectorsAction(directors));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })()
    }, [apiEndPoint, dispatchMovieAction, handleError]);

    const getGenres = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available directors from ${apiEndPoint}`;
        (async () => {
            try {
                const genres = await movieAPi.getGenres();
                isDispatchable && dispatchMovieAction(State.updateSelectableGenresAction(genres));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })()
    }, [apiEndPoint, dispatchMovieAction, handleError]);

    const createMovieCard = useCallback((
        movieCard: Model.INewMovieCard,
        errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed creating movie card at ${apiEndPoint}`;
        (async () => {
            try {
                const moviCardDTO = mapNewMoviCardEntityToNewMOvieCardDTO(movieCard)
                const createdMovieCard: Model.IMovieCardEntity = await movieAPi.createMovieCard(moviCardDTO);
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })()
    }, [apiEndPoint, dispatchMovieAction, handleError]);

    const isPending = () => {
        return pending
    };

    return {
        isPending,
        getMovieCards,
        getActors,
        getGenres,
        getDirectors,
        createMovieCard
    };
}
