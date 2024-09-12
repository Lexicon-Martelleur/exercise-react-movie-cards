import { IMovieAPI } from "./IMovieAPI";
import { MovieAPI } from "./MovieAPI";
import { IAuthAPI } from "./IAuthAPI";
import { AuthAPI } from "./AuthAPI";
import { createAPIProxy } from "./APIProxy";
import { ITokenContainer } from "../model";

export function createMovieAPI (
    apiEndpoint: string,
    tokens: ITokenContainer
): IMovieAPI {
    const defaultMovieApi: IMovieAPI = new MovieAPI(
        apiEndpoint,
        tokens);
    return createAPIProxy(defaultMovieApi, apiEndpoint);
}

export function createAuthAPI (apiEndpoint: string): IAuthAPI {
    const defaultAuthApi: IAuthAPI = new AuthAPI(apiEndpoint);
    return createAPIProxy(defaultAuthApi, apiEndpoint);
}
