import { minRating, movieGenre } from "../constants";
import * as Model from "../model";

export function getEmptyMovieCard (): Model.IMovieCard {
    return {
        title: "",
        description: "",
        rating: minRating,
        timeStamp: getUNIXTimestampInSeconds(),
    };
}

export function createMovieCardObject(obj: unknown): Model.IMovieCard {
    const defaultMovieCard = getEmptyMovieCard();
    
    if (typeof obj !== "object" || obj === null) {
        return defaultMovieCard;
    }

    return Model.isMovieCard(obj) ? obj : defaultMovieCard;
}

export function getNewEmptyMovieCard (): Model.INewMovieCard {
    return {
        title: "",
        timeStamp: getUNIXTimestampInSeconds(),
        description: "",
        director: "",
        actors: [],
        rating: minRating,
        genres: [movieGenre.unknown]
    };
}

export function createNewMovieCardObject(obj: unknown): Model.INewMovieCard {
    const defaultNewMovieCard = getNewEmptyMovieCard();
    
    if (typeof obj !== "object" || obj === null) {
        return defaultNewMovieCard;
    }

    return Model.isNewMovieCard(obj) ? obj : defaultNewMovieCard;
}


export function getUNIXTimestampInSeconds (): number {
    return Math.floor(Date.now() / 1000);
}

export function convertUNIXTimestapToDateTime(timestampInSeconds: number): string {
    const date = new Date(timestampInSeconds * 1000);
    return date.toLocaleString(); 
}

export function convertUNIXTimestapToDate(timestampInSeconds: number): string {
    const date = new Date(timestampInSeconds * 1000);
    return date.toLocaleDateString(); 
}
