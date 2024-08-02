import { v4 as uuid } from 'uuid';

import {
    getAllMovieCards,
    getEmptyMovieCard,
    IMovieCardEntity
} from "../../../service";
import { movieCardActions } from "./constants";
import * as type from "./types";

export const movieCardInitData: type.IMovieCardState = {
    newMovieCard: getEmptyMovieCard(),
    movieCards: getAllMovieCards() 
} as const;

export const movieCardReducer = (
    state: type.IMovieCardState,
    action: type.MovieCardActionType
) => {
    switch (action.type) {
        case movieCardActions.updateNewMovieCard:
            return handleUpdateNewMovieCard(state, action);
        case movieCardActions.addMovieCard:
            return handleAddMovieCard(state, action);
        case movieCardActions.removeMovieCard:
            return handleRemoveMovieCard(state, action);
        default: 
            return state;
    }
}

function handleUpdateNewMovieCard(
    state: type.IMovieCardState,
    action: type.UpdateNewMovieCardAction
): type.IMovieCardState {
    return { ...state,  newMovieCard: action.payload };
}

function handleAddMovieCard(
    state: type.IMovieCardState,
    action: type.AddMovieCardAction
): type.IMovieCardState {
    const newMovieCardEntity: IMovieCardEntity = {
        id: uuid(),
        moviecard: action.payload
    };
    
    return {
        ...state,
        movieCards: [...state.movieCards, newMovieCardEntity],
    };
}

function handleRemoveMovieCard(
    state: type.IMovieCardState,
    action: type.RemoveMovieCardAction
): type.IMovieCardState {
    return {
        ...state,
        movieCards: state.movieCards.filter(card => card.id !== action.payload
        ),
    };
}
