import { IActor, IDirector, IMovieCard, IMovieCardEntity, INewMovieCard } from "../../../model";
import { movieCardActions } from "./constants";
import {
    AddMovieCardAction,
    AddMovieCardEntitiesAction,
    RemoveMovieCardAction,
    UpdateErrorStateAction,
    UpdateNewMovieCardAction,
    UpdateSelectableActorsAction,
    UpdateSelectableDirectorsAction
} from "./types";

export const updateNewMovieCardAction = (
    movieCard: INewMovieCard
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

export const updateSelectableActorsAction = (
    actors: IActor[]
): UpdateSelectableActorsAction => {
    return {
        type: movieCardActions.updateSelectableActors,
        payload: actors
    };
}

export const updateSelectableDirectorsAction = (
    directors: IDirector[]
): UpdateSelectableDirectorsAction => {
    return {
        type: movieCardActions.updateSelectableDirectors,
        payload: directors
    };
}

export const updateErrorStateAction = (
    isError: boolean,
    msg: string
): UpdateErrorStateAction => {
    return {
        type: movieCardActions.updateErrorState,
        payload: { isError, msg }
    };
}

export const clearErrorStateAction = (): UpdateErrorStateAction => {
    return {
        type: movieCardActions.updateErrorState,
        payload: { isError: false, msg: "" }
    };
}
