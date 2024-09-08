import { IMovieCardEntity } from "../model";

export interface IMovieAPI {
    getMovies: (signal?: AbortSignal) => Promise<IMovieCardEntity[]>
}
