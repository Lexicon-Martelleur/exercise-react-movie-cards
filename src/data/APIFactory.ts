import { IMovieAPI } from "./IMovieAPI";
import { MovieAPI } from "./MovieAPI";
import { createAPIProxy } from "./APIProxy";

export function createMovieAPI (apiEndpoint: string): IMovieAPI {
    const defaultMovieApi: IMovieAPI = new MovieAPI(apiEndpoint);
    return createAPIProxy(defaultMovieApi, apiEndpoint)
}
