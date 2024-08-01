import { movieGenre } from "./constants";

export type MovieGenreType = typeof movieGenre[
    keyof typeof movieGenre
];

export type RatingType = number;

export interface IMovieCard {
    title: string;
    description: string;
    genre: MovieGenreType;
    rating: RatingType;
}

export interface IMovieCardEntity {
    id: string;
    moviecard: IMovieCard;
}
