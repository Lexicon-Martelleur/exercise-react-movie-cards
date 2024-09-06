import { maxRating, minRating, movieGenre } from "../constants";

export type MovieGenreType = typeof movieGenre[
    keyof typeof movieGenre
];

export type RatingType = number;

export type IMovieCard = Readonly<{
    title: string;
    description: string;
    genre: MovieGenreType;
    rating: RatingType;
}>

export type IMovieCardEntity = Readonly<{
    id: string;
    moviecard: IMovieCard;
}>

export function isMovieCardEntity (obj: unknown): obj is IMovieCardEntity {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const entityObj = obj as IMovieCardEntity;
    return (
        typeof entityObj.id === "string" &&
        isMovieCard(entityObj.moviecard) 
    );
}

export function isMovieCard (obj: unknown): obj is IMovieCard {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const todoObj = obj as IMovieCard;
    return (
        typeof todoObj.title === "string" &&
        typeof todoObj.description ===  "string" &&
        isValidGenre(todoObj.genre) &&
        isValidMovieRating(todoObj.rating)
    );
}

export function isValidGenre (genre: string): genre is MovieGenreType {
    return (
        typeof genre === "string" &&
        Object.keys(movieGenre).includes(genre as MovieGenreType)
    );
}

export function isValidMovieRating (rating: number): rating is RatingType {
    return rating >= minRating && rating <= maxRating;
}