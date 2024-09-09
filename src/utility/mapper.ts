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
    };
}

export function mapActorDTOToActorEntity (
    actor: Model.ActorDTO
): Model.IActor {
    return {
        id: `${actor.id}`,
        name: actor.name,
        dateOfBirth: actor.dateOfBirth
    };
}

export function mapDirectorDTOToDirectorEntity (
    director: Model.DirectorDTO
): Model.IDirector {
    return {
        id: `${director.id}`,
        name: director.name,
        dateOfBirth: director.dateOfBirth
    };
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
        genreIds: movieCard.genres.map(item => Number(item))
    };
}

export function mapGenreDTOToGenreEntity (
    genre: Model.GenreDTO
): Model.IGenre {
    return {
        id: `${genre.id}`,
        name: genre.nameAsString,
        nameAsNumber: genre.nameAsNumber
    };
}
