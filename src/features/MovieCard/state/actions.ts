import { IMovieCard, IMovieCardEntity } from "../../../model";
import { movieCardActions } from "./constants";
import {
    AddMovieCardAction,
    AddMovieCardEntitiesAction,
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

export const addMovieCardEntitiesAction = (
    movieCard: IMovieCardEntity[]
): AddMovieCardEntitiesAction => {
    return {
        type: movieCardActions.addMovieCardEntities,
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
