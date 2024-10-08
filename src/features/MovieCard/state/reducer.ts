import { movieCardActions } from "./constants";
import * as Type from "./types";

export const movieCardReducer = (
    state: Type.IMovieCardState,
    action: Type.MovieCardActionType
) => {
    switch (action.type) {
        case movieCardActions.updateNewMovieCard:
            return handleUpdateNewMovieCard(state, action);
        case movieCardActions.updateCreatedMovieCard:
            return handleUpdateCreatedMovieCard(state, action);
        case movieCardActions.updateSelectableActors:
            return handleUpdateSelectableActors(state, action);
        case movieCardActions.updateSelectableDirectors:
            return handleUpdateSelectableDirectors(state, action);
        case movieCardActions.updateSelectableGenres:
            return handleUpdateSelectableGenres(state, action);
        case movieCardActions.updateErrorState:
            return handleUpdateErrorState(state, action);
        default: 
            return state;
    }
};

function handleUpdateNewMovieCard (
    state: Type.IMovieCardState,
    action: Type.UpdateNewMovieCardAction
): Type.IMovieCardState {
    return { ...state,  newMovieCard: action.payload };
}

function handleUpdateCreatedMovieCard (
    state: Type.IMovieCardState,
    action: Type.UpdateCreatedMovieCardAction
): Type.IMovieCardState {
    return { ...state,  createdMovieCard: action.payload };
}

function handleUpdateSelectableActors (
    state: Type.IMovieCardState,
    action: Type.UpdateSelectableActorsAction
): Type.IMovieCardState {
    return {
        ...state,
        selectableActors: action.payload
    };
}

function handleUpdateSelectableDirectors (
    state: Type.IMovieCardState,
    action: Type.UpdateSelectableDirectorsAction
): Type.IMovieCardState {
    return {
        ...state,
        selectableDirectors: action.payload
    };
}

function handleUpdateSelectableGenres (
    state: Type.IMovieCardState,
    action: Type.UpdateSelectableGenresAction
): Type.IMovieCardState {
    return {
        ...state,
        selectableGenres: action.payload
    };
}

function handleUpdateErrorState (
    state: Type.IMovieCardState,
    action: Type.UpdateErrorStateAction
): Type.IMovieCardState {
    return {
        ...state,
        isError: action.payload.isError,
        errorMsg: action.payload.msg
    };
}
