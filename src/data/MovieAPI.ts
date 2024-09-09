import { IMovieAPI } from "./IMovieAPI";
import { APIError } from "./APIError";
import * as Model from "../model";
import * as Utlity from "../utility";

export class MovieAPI implements IMovieAPI {
    constructor (private readonly API: string) {}

    private readonly defaultHeader = {
        "Content-Type": "application/json",
    };

    async getMovies (signal?: AbortSignal): Promise<Model.IMovieCardEntity[]> {
        const url = `${this.API}/movies`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Model.isMovieDTO)) { throw new APIError(); }
        const movieDTOs = resJSON as Model.MovieDTO[];
        return movieDTOs.map(Utlity.mapMovieDTOToMovieCardEntity);
    }

    async getActors(signal?: AbortSignal): Promise<Model.IActor[]> {
        const url = `${this.API}/actors`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Model.isActorDTO)) { throw new APIError(); }
        const actorDTOs = resJSON as Model.ActorDTO[];
        return actorDTOs.map(Utlity.mapActorDTOToActorEntity);
    }

    async getDirectors(signal?: AbortSignal): Promise<Model.IDirector[]> {
        const url = `${this.API}/directors`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Model.isDirectorDTO)) { throw new APIError(); }
        const directorDTOs = resJSON as Model.DirectorDTO[];
        return directorDTOs.map(Utlity.mapDirectorDTOToDirectorEntity);
    }
}
