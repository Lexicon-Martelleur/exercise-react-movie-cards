import { IMovieCardEntity, minRating, movieGenre } from "../../../service";

export const mockMovieCardEntity: IMovieCardEntity = {
    id: "1",
    moviecard: {
        title: "mockTitle",
        description: "mockDescription",
        rating: minRating,
        genre: movieGenre.unknown,
    }
} as const;