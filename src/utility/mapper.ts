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
