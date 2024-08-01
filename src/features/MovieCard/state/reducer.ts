import { IMovieCardEntity } from "../../../service";
import { movieCardActions } from "./constants";
import * as action from "./types";
import { v4 as uuid } from 'uuid';

export const movieCardReducer = (
    state: action.IMovieCardState,
    action: action.MovieCardActionType
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
    state: action.IMovieCardState,
    action: action.UpdateNewMovieCardAction
): action.IMovieCardState {
    return { ...state,  newMovieCard: action.payload}
}

function handleAddMovieCard(
    state: action.IMovieCardState,
    action: action.AddMovieCardAction
): action.IMovieCardState {
    try {
        const newMovieCardEntity: IMovieCardEntity = {
            id: uuid(),
            moviecard: action.payload
        };

        const x = {
            ...state,
            movieCards: [...state.movieCards, newMovieCardEntity],
        };
        console.log(x)
        return x;
    } catch {
        return state
    }
}

function handleRemoveMovieCard(
    state: action.IMovieCardState,
    action: action.RemoveMovieCardAction
): action.IMovieCardState {
    return {
        ...state,
        movieCards: state.movieCards.filter(card => card.id !== action.payload
        ),
    };
}
