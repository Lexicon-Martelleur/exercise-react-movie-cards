import {
    IMovieCardEntity,
    MovieGenreType
} from "../../../service";

export function selectTitle(movieCardEntity: IMovieCardEntity): string {
    return movieCardEntity.moviecard.title;
}

export function selectRating(movieCardEntity: IMovieCardEntity): number {
    return movieCardEntity.moviecard.rating;
}

export function selectGenre(movieCardEntity: IMovieCardEntity): MovieGenreType {
    return movieCardEntity.moviecard.genre;
}

export function selectDescription(movieCardEntity: IMovieCardEntity): string {
    return movieCardEntity.moviecard.description;
}
