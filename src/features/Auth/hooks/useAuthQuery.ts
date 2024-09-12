import { useCallback } from "react";

import { createAuthAPI } from "../../../data";
import { getMovieAPI, isDevelopment } from "../../../config";
import * as Model from "../../../model";

export type MovieAPIHook = ReturnType<typeof useAuthQuery>;

/**
 * A custom hook used as a wrapper for
 * Auth API.
 */
export function useAuthQuery () {
    const apiEndPoint = getMovieAPI();
    const movieAPi = createAuthAPI(apiEndPoint);

    const handleError = useCallback((
        err: unknown,
        msg: string
    ) => {
        isDevelopment() && console.log(err);
        console.log(msg);
    }, []);

    const login = useCallback(async (
        userAuth: Model.IUserAuth,
        errorMsg?: string) => {
        let tokens: Model.ITokenContainer | null = null; 
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed fetching available movie cards from ${apiEndPoint}`;
        try {
            tokens = await movieAPi.login(userAuth);
        } catch (err) {
            handleError(err, constructedErrosMsg);
        } finally {
            return tokens;
        }
    }, []);

    return {
        login
    };
}
