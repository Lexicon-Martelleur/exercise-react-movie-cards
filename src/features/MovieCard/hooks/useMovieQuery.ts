import { useCallback, useState } from "react";

import { createMovieAPI } from "../../../data";
import * as State from "../state";
import { getMovieAPI, isDevelopment } from "../../../config";
import * as Model from "../../../model";
import { mapNewMoviCardEntityToNewMOvieCardDTO } from "../../../utility";
import { useAuthContext } from "../../Auth/context";
import { APIError } from "../../../data/APIError";

export type MovieAPIHook = ReturnType<typeof useMovieQuery>;

/**
 * A custom hook used as a wrapper for
 * Movie API.
 */
export function useMovieQuery (
    dispatchMovieAction?: React.Dispatch<State.MovieCardActionType>
) {
    const { tokens } = useAuthContext();
    const [pending, setPending] = useState(false);
    const isDispatchable = dispatchMovieAction != null;
    const apiEndPoint = getMovieAPI();

    const handleError = useCallback((
        err: unknown,
        msg: string
    ) => {
        isDevelopment() && console.log(err);
        isDispatchable && dispatchMovieAction(State.updateErrorStateAction(true, msg))
    }, [dispatchMovieAction]);

    const constructMovieApi = () => {
        if (tokens == null) { throw new APIError("Token is not set") }
        return createMovieAPI(apiEndPoint, tokens);
    }

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
            [movieCards, pagination] = await constructMovieApi().getMovies(page);
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
                const actors = await constructMovieApi().getActors();
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
                const directors = await constructMovieApi().getDirectors();
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
                const genres = await constructMovieApi().getGenres();
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
            let createdMovieCard: Model.IMovieCardEntity | null = null
            try {
                const moviCardDTO = mapNewMoviCardEntityToNewMOvieCardDTO(movieCard)
                createdMovieCard = await constructMovieApi().createMovieCard(moviCardDTO);
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                isDispatchable && dispatchMovieAction(State.updateCreatedMovieCardAction(createdMovieCard));
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
