import { useCallback, useState } from "react";

import { createMovieAPI } from "../../../data";
import * as State from "../state";
import { getMovieAPI, isDevelopment } from "../../../config";
import * as Model from "../../../model";
import { mapNewMoviCardEntityToNewMOvieCardDTO } from "../../../utility";
import { useAuthContext } from "../../Auth/context";
import { APIError } from "../../../data/APIError";
import { expiredToken } from "../../../service";
import { useAuthQuery } from "../../Auth/hooks";

export type MovieAPIHook = ReturnType<typeof useMovieQuery>;

/**
 * A custom hook used as a wrapper for
 * Movie API.
 */
export function useMovieQuery (
    dispatchMovieAction?: React.Dispatch<State.MovieCardActionType>
) {
    const { tokens, updateTokens } = useAuthContext();
    const { refreshTokens } = useAuthQuery();
    const [pending, setPending] = useState(false);
    const isDispatchable = dispatchMovieAction != null;
    const apiEndPoint = getMovieAPI();

    const handleError = useCallback((
        err: unknown,
        msg: string
    ) => {
        isDevelopment() && console.log(err);
        isDispatchable && dispatchMovieAction(State.updateErrorStateAction(true, msg));
    }, [isDispatchable, dispatchMovieAction]);

    /**
     * @TODO Display for user the reason why logged is due
     * (refresh)token has expired.
     * @TODO Refresh API is occasionaly not working.
     */
    const constructMovieApi = useCallback(async () => {
        if (tokens == null) { throw new APIError("Token is not set"); }
        if (expiredToken(tokens.accessToken)) {
            // console.log("Refreshing token", tokens)
            const refreshedTokens = await refreshTokens(tokens);
            updateTokens(refreshedTokens);
            if (refreshedTokens == null) {
                throw new APIError("Could not refresh token");
            }
            return createMovieAPI(apiEndPoint, refreshedTokens); 
        }
        return createMovieAPI(apiEndPoint, tokens);
    }, [apiEndPoint, tokens, updateTokens]);

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
            const api = await constructMovieApi();
            [movieCards, pagination] = await api.getMovies(page);
        } catch (err) {
            handleError(err, constructedErrosMsg);
        } finally {
            setPending(false);
        }
        return [movieCards, pagination];
    }, [apiEndPoint, constructMovieApi, handleError]);

    const getActors = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available actors from ${apiEndPoint}`;
        (async () => {
            try {
                const api = await constructMovieApi();
                const actors = await api.getActors();
                isDispatchable && dispatchMovieAction(State.updateSelectableActorsAction(actors));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })();
    }, [
        apiEndPoint,
        isDispatchable,
        dispatchMovieAction,
        handleError
    ]);

    const getDirectors = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available directors from ${apiEndPoint}`;
        (async () => {
            try {
                const api = await constructMovieApi();
                const directors = await api.getDirectors();
                isDispatchable && dispatchMovieAction(State.updateSelectableDirectorsAction(directors));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })();
    }, [
        apiEndPoint,
        isDispatchable,
        dispatchMovieAction,
        handleError
    ]);

    const getGenres = useCallback((errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available directors from ${apiEndPoint}`;
        (async () => {
            try {
                const api = await constructMovieApi();
                const genres = await api.getGenres();
                isDispatchable && dispatchMovieAction(State.updateSelectableGenresAction(genres));
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                setPending(false);
            }
        })();
    }, [
        apiEndPoint,
        isDispatchable,
        dispatchMovieAction,
        handleError
    ]);

    const createMovieCard = useCallback((
        movieCard: Model.INewMovieCard,
        errorMsg?: string) => {
        setPending(true);
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed creating movie card at ${apiEndPoint}`;
        (async () => {
            let createdMovieCard: Model.IMovieCardEntity | null = null;
            try {
                const moviCardDTO = mapNewMoviCardEntityToNewMOvieCardDTO(movieCard);
                const api = await constructMovieApi();
                createdMovieCard = await api.createMovieCard(moviCardDTO);
            } catch (err) {
                handleError(err, constructedErrosMsg);
            } finally {
                isDispatchable && dispatchMovieAction(State.updateCreatedMovieCardAction(createdMovieCard));
                setPending(false);
            }
        })();
    }, [
        apiEndPoint,
        isDispatchable,
        dispatchMovieAction,
        handleError
    ]);

    const isPending = () => {
        return pending;
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
