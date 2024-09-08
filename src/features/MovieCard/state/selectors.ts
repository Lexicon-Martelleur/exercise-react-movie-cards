import { IMovieCardEntity } from "../../../model";
import * as Service from "../../../service";

export function selectTitle(movieCardEntity: IMovieCardEntity): string {
    return movieCardEntity.moviecard.title;
}

export function selectRating(movieCardEntity: IMovieCardEntity): number {
    return movieCardEntity.moviecard.rating;
}

export function selectDateTime(movieCardEntity: IMovieCardEntity): string {
    return Service.convertUNIXTimestapToDateTime(movieCardEntity.moviecard.timeStamp);
}

export function selectDate(movieCardEntity: IMovieCardEntity): string {
    return Service.convertUNIXTimestapToDate(movieCardEntity.moviecard.timeStamp);
}

export function selectDescription(movieCardEntity: IMovieCardEntity): string {
    return movieCardEntity.moviecard.description;
}
