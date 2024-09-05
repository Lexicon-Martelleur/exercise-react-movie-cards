import { v4 as uuid } from 'uuid';

import { getAllMovieCards, getEmptyMovieCard } from "../../../service";
import { IMovieCardEntity } from '../../../types';
import { movieCardActions } from "./constants";
import * as MovieStateType from "./types";

export const movieCardInitData: MovieStateType.IMovieCardState = {
    newMovieCard: getEmptyMovieCard(),
    movieCards: getAllMovieCards() 
} as const;

export const movieCardReducer = (
    state: MovieStateType.IMovieCardState,
    action: MovieStateType.MovieCardActionType
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
    state: MovieStateType.IMovieCardState,
    action: MovieStateType.UpdateNewMovieCardAction
): MovieStateType.IMovieCardState {
    return { ...state,  newMovieCard: action.payload };
}

function handleAddMovieCard(
    state: MovieStateType.IMovieCardState,
    action: MovieStateType.AddMovieCardAction
): MovieStateType.IMovieCardState {
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
    state: MovieStateType.IMovieCardState,
    action: MovieStateType.RemoveMovieCardAction
): MovieStateType.IMovieCardState {
    return {
        ...state,
        movieCards: state.movieCards.filter(card => card.id !== action.payload
        ),
    };
}
