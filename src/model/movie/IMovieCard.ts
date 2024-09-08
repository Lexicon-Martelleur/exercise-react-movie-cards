import { isValidMovieRating, RatingType } from "./RatingType";

export type IMovieCard = Readonly<{
    title: string;
    description: string;
    timeStamp: number;
    rating: RatingType;
}>

export function isMovieCard (obj: unknown): obj is IMovieCard {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const todoObj = obj as IMovieCard;
    return (
        typeof todoObj.title === "string" &&
        typeof todoObj.description ===  "string" &&
        typeof todoObj.timeStamp ===  "number" &&
        isValidMovieRating(todoObj.rating)
    );
}
