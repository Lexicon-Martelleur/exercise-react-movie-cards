import { useCallback, useState } from "react";

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
    const authAPi = createAuthAPI(apiEndPoint);
    const [pending, setPending] = useState(false);

    const handleError = useCallback((
        err: unknown,
        msg: string
    ) => {
        isDevelopment() && console.log(err);
        console.log(msg);
    }, []);

    const login = useCallback(async (
        userAuth: Model.IUserAuth,
        errorMsg?: string
    ) => {
        setPending(true);
        let tokens: Model.ITokenContainer | null = null; 
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed login to ${apiEndPoint}`;
        try {
            tokens = await authAPi.login(userAuth);
        } catch (err) {
            handleError(err, constructedErrosMsg);
        } finally {
            setPending(false);
        }
        return tokens;
    }, [authAPi.login, apiEndPoint, handleError]);

    const refreshTokens = useCallback(async (
        tokens: Model.ITokenContainer,
        errorMsg?: string
    ) => {
        setPending(true);
        let refreshTokens: Model.ITokenContainer | null = null;
        const constructedErrosMsg = errorMsg != null
            ? errorMsg
            : `Failed refreshing token at ${apiEndPoint}`;
        try {
            refreshTokens = await authAPi.refreshTokens(tokens);
        } catch (err) {
            handleError(err, constructedErrosMsg);
        } finally {
            setPending(false);
        }
        return refreshTokens;
    }, [authAPi.refreshTokens, apiEndPoint, handleError]);

    return {
        pending,
        login,
        refreshTokens
    };
}
