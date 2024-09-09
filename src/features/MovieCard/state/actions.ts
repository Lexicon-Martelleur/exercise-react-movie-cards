import {
    IActor,
    IDirector,
    IGenre,
    INewMovieCard
} from "../../../model";
import { movieCardActions } from "./constants";
import {
    UpdateErrorStateAction,
    UpdateNewMovieCardAction,
    UpdateSelectableActorsAction,
    UpdateSelectableDirectorsAction,
    UpdateSelectableGenresAction
} from "./types";

export const updateNewMovieCardAction = (
    movieCard: INewMovieCard
): UpdateNewMovieCardAction => {
    return {
        type: movieCardActions.updateNewMovieCard,
        payload: movieCard
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

export const updateSelectableGenresAction = (
    genres: IGenre[]
): UpdateSelectableGenresAction => {
    return {
        type: movieCardActions.updateSelectableGenres,
        payload: genres
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
