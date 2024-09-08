import { useCallback, useRef, useState } from "react";

import { createMovieAPI } from "../../../data";
import * as State from "../state";
import { getMovieAPI, isDevelopment } from "../../../config";

export type MovieAPIHook = ReturnType<typeof useMovieQuery>

/**
 * A custom hook used as a wrapper for
 * Todo API and a data synchronizer bewteen
 * remote and local data.
 */
export function useMovieQuery (
    dispatchMovieAction: React.Dispatch<State.MovieCardActionType>
) {
    const [pending, setPending] = useState(false);

    const apiEndPoint = getMovieAPI();
    const movieAPi = createMovieAPI(apiEndPoint);

    const handleError = useCallback((
        err: unknown,
        errorMsg: string
    ) => {
        isDevelopment() && console.log(err);
    }, [dispatchMovieAction])

    const getTodos = useCallback(() => {
        setPending(true);
        (async () => {
            try {
                const movieCards = await movieAPi.getMovies();
                dispatchMovieAction(State.addMovieCardEntitiesAction(movieCards));
            } catch (err) {
                handleError(err, `Failed fetching todos from from ${apiEndPoint}`);
            } finally {
                setPending(false);
            }
        })()
    }, [apiEndPoint, dispatchMovieAction, handleError])

    return useRef({
        pending,
        getTodos
    }).current;
}
