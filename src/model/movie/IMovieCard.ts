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

    const castObj = obj as IMovieCard;
    return (
        typeof castObj.title === "string" &&
        typeof castObj.description ===  "string" &&
        typeof castObj.timeStamp ===  "number" &&
        isValidMovieRating(castObj.rating)
    );
}
