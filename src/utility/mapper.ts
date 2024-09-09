import { movieGenre } from "../constants";
import * as Model from "../model";

export function mapMovieDTOToMovieCardEntity (
    movieDTO: Model.MovieDTO
): Model.IMovieCardEntity {
    return {
        id: `${movieDTO.id}`,
        moviecard: {
            title: movieDTO.title,
            rating: movieDTO.rating,
            description: movieDTO.description,
            timeStamp: movieDTO.timeStamp
        }
    }
}

export function mapActorDTOToActorEntity (
    actor: Model.ActorDTO
): Model.IActor {
    return {
        id: `${actor.id}`,
        name: actor.name,
        dateOfBirth: actor.dateOfBirth
    }
}

export function mapDirectorDTOToDirectorEntity (
    director: Model.DirectorDTO
): Model.IDirector {
    return {
        id: `${director.id}`,
        name: director.name,
        dateOfBirth: director.dateOfBirth
    }
}

export function mapNewMoviCardEntityToNewMOvieCardDTO (
    movieCard: Model.INewMovieCard
): Model.NewMovieCardDTO {
    return {
        title: movieCard.title,
        timeStamp: movieCard.timeStamp,
        description: movieCard.description,
        rating: movieCard.rating,
        directorId: Number(movieCard.director),
        actorIds: movieCard.actors.map(item => Number(item)),
        genreIds: movieCard.genres.map(mapGenreToNumbers)
    }
}

/**
 * @TODO Refactor frontend to only rely on server defined genres.
 * Currently solution genres constant on frontend is not insync with api
 * defined genres. 
 */
export function mapGenreToNumbers (genre: string) {
    const findGenreIndex = Object.values(movieGenre).findIndex(item => item === genre);
    return findGenreIndex == null ? 1 : findGenreIndex + 1
}
