import { getMovieAPI } from "../config";
import { IMovieAPI } from "./IMovieAPI";
import { APIError } from "./APIError";
import { IMovieCardEntity, isMovieCardEntity } from "../types";
import { createAPIProxy } from "./APIProxy";
import { isMovieDTO, mapMovieDTOToMovieCardEntity, MovieDTO } from "../dtos";

class MovieAPI implements IMovieAPI {
    private readonly API = getMovieAPI();
    
    private readonly defaultHeader = {
        "Content-Type": "application/json",
    };

    /**
     * @TODO Need to fetch genre from api
     * to be able to map.
     */
    async getMovies (
        signal?: AbortSignal
    ): Promise<IMovieCardEntity[]> {
        const url = `${this.API}/movies`;
        const res = await fetch(url, {
            headers: this.defaultHeader,
            signal,
        });

        if(!res.ok) { throw new APIError(res.statusText); }
        const movieDTOs = await res.json();

        if (movieDTOs.every(isMovieDTO)) {
            throw new APIError();
        }

        const movieList = (
            movieDTOs as MovieDTO[]
        ).map(mapMovieDTOToMovieCardEntity);
               
        if (movieList.every(isMovieCardEntity)) {
            return movieList;
        } else {
            throw new APIError();
        }
    }
}

const defaultMovieApi: IMovieAPI = new MovieAPI();
export const todoApi = createAPIProxy(defaultMovieApi);
