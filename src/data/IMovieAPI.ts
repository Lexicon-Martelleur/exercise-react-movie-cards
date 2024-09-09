import * as Model from "../model";

export interface IMovieAPI {
    getActors: (signal?: AbortSignal) => Promise<Model.IActor[]>;
    
    getDirectors: (signal?: AbortSignal) => Promise<Model.IDirector[]>;
    
    getMovies: (signal?: AbortSignal) => Promise<Model.IMovieCardEntity[]>;

    getGenres: (signal?: AbortSignal) => Promise<Model.IGenre[]>;

    createMovieCard(
        movieCard: Model.NewMovieCardDTO,
        signal?: AbortSignal): Promise<Model.IMovieCardEntity>;
}
