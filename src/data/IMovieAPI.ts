import { IActor, IDirector, IMovieCardEntity } from "../model";

export interface IMovieAPI {
    getActors(signal?: AbortSignal): Promise<IActor[]>;
    getDirectors(signal?: AbortSignal): Promise<IDirector[]>;
    getMovies: (signal?: AbortSignal) => Promise<IMovieCardEntity[]>;
}
