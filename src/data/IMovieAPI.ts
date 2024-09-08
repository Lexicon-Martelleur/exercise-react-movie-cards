import { IActor, IDirector, IMovieCardEntity } from "../model";

export interface IMovieAPI {
    getActors(): Promise<IActor[]>;
    getDirectors(): Promise<IDirector[]>;
    getMovies: (signal?: AbortSignal) => Promise<IMovieCardEntity[]>
}
