import { isValidMovieRating, RatingType } from "../movie/RatingType";

export interface NewMovieCardDTO {
    title: string;
    timeStamp: number;
    description: string;
    rating: RatingType;
    directorId: number;
    actorIds: number[]
    genreIds: number[]
}

export function isNewMovieCardDTO (obj: unknown): obj is NewMovieCardDTO {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as NewMovieCardDTO;
    return (
        typeof castObj.title === "string" &&
        typeof castObj.timeStamp ===  "number" &&
        typeof castObj.description ===  "string" &&
        typeof castObj.directorId ===  "number" &&
        Array.isArray(castObj.actorIds) &&
        castObj.actorIds.every(Number.isFinite) &&
        isValidMovieRating(castObj.rating) &&
        Array.isArray(castObj.genreIds) && 
        castObj.genreIds.every(Number.isFinite)
    );
}
