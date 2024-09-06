import { IMovieCardEntity } from "../types";

export interface IMovieAPI {
    getMovies: (signal?: AbortSignal) => Promise<IMovieCardEntity[]>
}
