import { v4 as uuid } from 'uuid';

import { IMovieCardEntity } from '../../../model';
import { movieCardActions } from "./constants";
import * as Type from "./types";

export const movieCardReducer = (
    state: Type.IMovieCardState,
    action: Type.MovieCardActionType
) => {
    switch (action.type) {
        case movieCardActions.updateNewMovieCard:
            return handleUpdateNewMovieCard(state, action);
        case movieCardActions.addMovieCard:
            return handleAddMovieCard(state, action);
        case movieCardActions.addMovieCardEntities:
            return handleAddMovieCardEntities(state, action);
        case movieCardActions.removeMovieCard:
            return handleRemoveMovieCard(state, action);
        default: 
            return state;
    }
}

function handleUpdateNewMovieCard(
    state: Type.IMovieCardState,
    action: Type.UpdateNewMovieCardAction
): Type.IMovieCardState {
    return { ...state,  newMovieCard: action.payload };
}

function handleAddMovieCard(
    state: Type.IMovieCardState,
    action: Type.AddMovieCardAction
): Type.IMovieCardState {
    const newMovieCardEntity: IMovieCardEntity = {
        id: uuid(),
        moviecard: action.payload
    };

    return {
        ...state,
        movieCards: [...state.movieCards, newMovieCardEntity],
    };
}

function handleAddMovieCardEntities(
    state: Type.IMovieCardState,
    action: Type.AddMovieCardEntitiesAction
): Type.IMovieCardState {
    return {
        ...state,
        movieCards: action.payload,
    };
}

function handleRemoveMovieCard(
    state: Type.IMovieCardState,
    action: Type.RemoveMovieCardAction
): Type.IMovieCardState {
    return {
        ...state,
        movieCards: state.movieCards.filter(card => card.id !== action.payload
        ),
    };
}
