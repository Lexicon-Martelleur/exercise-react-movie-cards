import { IMovieAPI } from "./IMovieAPI";
import { APIError } from "./APIError";
import * as Model from "../model";
import * as Utility from "../utility";

export class MovieAPI implements IMovieAPI {
    private readonly defaultHeader;
    
    constructor (
        private readonly API: string,
        private readonly tokens: Model.ITokenContainer
    ) {
        this.defaultHeader = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.tokens.accessToken}`
        };
    }

    async getMovies (
        page: number,
        signal?: AbortSignal
    ): Promise<[Model.IMovieCardEntity[], Model.IPaginationMeta]> {
        const url = `${this.API}/movies?pageNr=${page}&pageSize=${10}`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Model.isMovieDTO)) { throw new APIError(); }
        const movieDTOs = resJSON as Model.MovieDTO[];
        const paginationData = JSON.parse(res.headers.get("X-Pagination") ?? "");
        
        if (!Model.isPaginationMeta(paginationData)) { throw new APIError(); }

        return [
            movieDTOs.map(Utility.mapMovieDTOToMovieCardEntity),
            paginationData
        ];
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
        return actorDTOs.map(Utility.mapActorDTOToActorEntity);
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
        return directorDTOs.map(Utility.mapDirectorDTOToDirectorEntity);
    }

    async getGenres(signal?: AbortSignal): Promise<Model.IGenre[]> {
        const url = `${this.API}/genres`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!(resJSON instanceof Array)) { throw new APIError(); }
        if (!resJSON.every(Model.isGenreDTO)) { throw new APIError(); }
        const directorDTOs = resJSON as Model.GenreDTO[];
        return directorDTOs.map(Utility.mapGenreDTOToGenreEntity);
    }

    async createMovieCard(
        movieCard: Model.NewMovieCardDTO,
        signal?: AbortSignal): Promise<Model.IMovieCardEntity> {
        const url = `${this.API}/movies`;
        const res = await fetch(url, {
            method: "POST",
            headers: this.defaultHeader,
            signal,
            body: JSON.stringify(movieCard)
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const resJSON: unknown = await res.json();

        if (!Model.isMovieDTO(resJSON)) { throw new APIError(); }
        const movieDTO = resJSON as Model.MovieDTO;
        return Utility.mapMovieDTOToMovieCardEntity(movieDTO);
    }
}
