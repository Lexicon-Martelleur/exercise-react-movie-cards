import { isValidMovieRating, RatingType } from "./RatingType";

export interface INewMovieCard {
    title: string;
    timeStamp: number;
    description: string;
    director: string
    actors: string[]
    rating: RatingType;
    genres: string[]
}

export function isNewMovieCard (obj: unknown): obj is INewMovieCard {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as INewMovieCard;
    return (
        typeof castObj.title === "string" &&
        typeof castObj.timeStamp ===  "number" &&
        typeof castObj.description ===  "string" &&
        typeof castObj.director ===  "string" &&
        Array.isArray(castObj.actors) &&
        castObj.actors.every(item => typeof item === "string") &&
        isValidMovieRating(castObj.rating) &&
        Array.isArray(castObj.genres) && 
        castObj.genres.every(item => typeof item === "string")
    );
}
