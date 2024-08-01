import { IMovieCard, IMovieCardEntity } from "../../../service";
import { movieCardActions } from "./constants";

export interface IMovieCardState {
    newMovieCard: IMovieCard;
    movieCards: IMovieCardEntity[]; 
}

export interface UpdateNewMovieCardAction {
    type: typeof movieCardActions.updateNewMovieCard;
    payload: IMovieCard;
}

export interface AddMovieCardAction {
    type: typeof movieCardActions.addMovieCard;
    payload: IMovieCard;
}

export interface RemoveMovieCardAction {
    type: typeof movieCardActions.removeMovieCard;
    payload: string;
}

export type MovieCardActionType = (
    UpdateNewMovieCardAction |
    AddMovieCardAction |
    RemoveMovieCardAction
);
