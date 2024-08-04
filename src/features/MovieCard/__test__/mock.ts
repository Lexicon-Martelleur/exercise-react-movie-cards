import { IMovieCard, IMovieCardEntity, minRating, movieGenre } from "../../../service";
import { IMovieCardState } from "../state";

export const mockMovieCardEntity: IMovieCardEntity = {
    id: "1",
    moviecard: {
        title: "mockTitle0",
        description: "mockDescription",
        rating: minRating,
        genre: movieGenre.unknown,
    }
} as const;

export const mockMovieCardOne: IMovieCard = {
    title: "mockTitle1",
    description: "mockDescription",
    rating: minRating,
    genre: movieGenre.unknown,
} as const;

export const mockMovieCardTwo: IMovieCard = {
    title: "mockTitle1",
    description: "mockDescription",
    rating: minRating,
    genre: movieGenre.unknown,
} as const;

export const mocMovieCardState: IMovieCardState = {
    movieCards: [mockMovieCardEntity],
    newMovieCard: mockMovieCardOne
} 
