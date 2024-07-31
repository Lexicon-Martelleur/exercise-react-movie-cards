import { IMovieCard } from "../../../service";
import { movieCardActions } from "./constants";
import { AddMovieCardAction, RemoveMovieCardAction, UpdateNewMovieCardAction } from "./types";

export const updateNewMovieCard = (
    movieCard: IMovieCard
): UpdateNewMovieCardAction => {
    return {
        type: movieCardActions.updateNewMovieCard,
        payload: movieCard
    };
}

export const addMovieCard = (
    movieCard: IMovieCard
): AddMovieCardAction => {
    return {
        type: movieCardActions.addMovieCard,
        payload: movieCard
    };
}

export const removeMovieCard = (
    movieCardId: number
): RemoveMovieCardAction => {
    return {
        type: movieCardActions.removeMovieCard,
        payload: movieCardId
    };
}
