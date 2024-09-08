import { IMovieAPI } from "./IMovieAPI";
import { APIError } from "./APIError";
import * as Type from "../model";
import { mapMovieDTOToMovieCardEntity } from "../utility";

export class MovieAPI implements IMovieAPI {
    constructor (private readonly API: string) {}

    private readonly defaultHeader = {
        "Content-Type": "application/json",
    };

    /**
     * @TODO Need to fetch genre from api
     * to be able to map.
     */
    async getMovies (
        signal?: AbortSignal
    ): Promise<Type.IMovieCardEntity[]> {
        const url = `${this.API}/movies`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Type.isMovieDTO)) { throw new APIError(); }
        const movieDTOs = resJSON as Type.MovieDTO[];
        return movieDTOs.map(mapMovieDTOToMovieCardEntity);
    }

    getActors(): Promise<Type.IActor[]> {
        throw new APIError("Method not implemented.");
    }
    getDirectors(): Promise<Type.IDirector[]> {
        throw new APIError("Method not implemented.");
    }
}
