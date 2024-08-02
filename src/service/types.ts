import { movieGenre } from "./constants";

export type MovieGenreType = typeof movieGenre[
    keyof typeof movieGenre
];

export type RatingType = number;

export type IMovieCard = Readonly <{
    title: string;
    description: string;
    genre: MovieGenreType;
    rating: RatingType;
}>

export type IMovieCardEntity = Readonly<{
    id: string;
    moviecard: IMovieCard;
}>
