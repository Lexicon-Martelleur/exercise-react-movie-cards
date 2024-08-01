import { maxRating, minRating, movieGenre } from "./constants";
import { IMovieCard, IMovieCardEntity, MovieGenreType, RatingType } from "./types";

export function getEmptyMovieCard (): IMovieCard {
    return {
        title: "",
        description: "",
        rating: minRating,
        genre: movieGenre.unknown,
    };
}

export const getAllMovieCards = (): IMovieCardEntity[] => {
    return [
        {
            id: "1",
            moviecard: {
                title: "The Maze Runner",
                description: "A group of boys with no memory of the outside must escape a massive maze",
                rating: 4,
                genre: movieGenre.fantasy,
            }
        },
        {
            id: "2",
            moviecard: {
                title: "Idiocracy",
                description: "When a less-than-average guy awakens in the year 2515, he finds he is now the smartest man on earth",
                rating: 3,
                genre: movieGenre.comedy,
            }
        },
        {
            id: "3",
            moviecard: {
                title: "The Bourne Ultimatum",
                description: "The third installment in the \"Bourne\" series finds Matt Damon as the rouge CIA agent who is still in search of his true identity",
                rating: maxRating,
                genre: movieGenre.action,
            }
        },
    ]
};

export function createMovieCardObject(obj: unknown): IMovieCard {
    const defaultMovieCard = getEmptyMovieCard();
    
    if (typeof obj !== "object" || obj === null) {
        return defaultMovieCard;
    }

    const input = obj as IMovieCard;

    return {
        title: typeof input.title === "string" ? input.title : defaultMovieCard.title,
        description: typeof input.description === "string" ? input.description : defaultMovieCard.description,
        genre: isValidGenre(input.genre) ? input.genre : defaultMovieCard.genre,
        rating: isValidMovieRating(input.rating) ? input.rating : defaultMovieCard.rating,
    };
}

export function isValidGenre (genre: string): genre is MovieGenreType {
    return (
        typeof genre === "string" &&
        Object.values(movieGenre).includes(genre as MovieGenreType)
    );
}

export function isValidMovieRating (rating: number): rating is RatingType {
    return rating >= minRating && rating <= maxRating;
}
  