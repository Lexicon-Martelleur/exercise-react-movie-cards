import { IMovieCard } from "../../../service";
import { movieCardActions } from "./constants";
import {
    AddMovieCardAction,
    RemoveMovieCardAction,
    UpdateNewMovieCardAction
} from "./types";

export const updateNewMovieCardAction = (
    movieCard: IMovieCard
): UpdateNewMovieCardAction => {
    return {
        type: movieCardActions.updateNewMovieCard,
        payload: movieCard
    };
}

export const addMovieCardAction = (
    movieCard: IMovieCard
): AddMovieCardAction => {
    return {
        type: movieCardActions.addMovieCard,
        payload: movieCard
    };
}

export const removeMovieCardAction = (
    movieCardId: string
): RemoveMovieCardAction => {
    return {
        type: movieCardActions.removeMovieCard,
        payload: movieCardId
    };
}
