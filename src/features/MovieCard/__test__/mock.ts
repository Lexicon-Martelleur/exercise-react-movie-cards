import { IMovieCard, IMovieCardEntity } from "../../../model";
import { maxRating, minRating } from "../../../constants";
import { IMovieCardState } from "../state";
import { getNewEmptyMovieCard, getUNIXTimestampInSeconds } from "../../../service";

export const mockMovieCardEntity: IMovieCardEntity = {
    id: "1",
    moviecard: {
        title: "mockTitle0",
        description: "mockDescription",
        rating: minRating,
        timeStamp: getUNIXTimestampInSeconds(),
    }
} as const;

export const mockMovieCardOne: IMovieCard = {
    title: "mockTitle1",
    description: "mockDescription",
    rating: minRating,
    timeStamp: getUNIXTimestampInSeconds(),
} as const;

export const mockMovieCardTwo: IMovieCard = {
    title: "mockTitle1",
    description: "mockDescription",
    rating: minRating,
    timeStamp: getUNIXTimestampInSeconds(),
} as const;

export const mockMovieCardState: IMovieCardState = {
    newMovieCard: getNewEmptyMovieCard(),
    selectableActors: [],
    selectableDirectors: [],
    selectableGenres: [],
    isError: false,
    errorMsg: ""
} as const;


export const getAllMovieCardsMock = (): IMovieCardEntity[] => {
    return [
        {
            id: "1",
            moviecard: {
                title: "The Maze Runner",
                description: "A group of boys with no memory of the outside must escape a massive maze",
                rating: 4,
                timeStamp: getUNIXTimestampInSeconds(),
            }
        },
        {
            id: "2",
            moviecard: {
                title: "Idiocracy",
                description: "When a less-than-average guy awakens in the year 2515, he finds he is now the smartest man on earth",
                rating: 3,
                timeStamp: getUNIXTimestampInSeconds(),
            }
        },
        {
            id: "3",
            moviecard: {
                title: "The Bourne Ultimatum",
                description: "The third installment in the \"Bourne\" series finds Matt Damon as the rouge CIA agent who is still in search of his true identity",
                rating: maxRating,
                timeStamp: getUNIXTimestampInSeconds(),
            }
        },
    ];
};
