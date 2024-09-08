import { maxRating, minRating } from "../../constants";

export type RatingType = number;

export function isValidMovieRating (rating: number): rating is RatingType {
    return rating >= minRating && rating <= maxRating;
}
