import * as Model from "../../../model";
import { IActor, IDirector } from "../../../model";
import { movieCardActions } from "./constants";

export type IMovieCardState = Readonly<{
    newMovieCard: Model.INewMovieCard;
    movieCards: Model.IMovieCardEntity[];
    selectableActors: IActor[];
    selectableDirectors: IDirector[];
    isError: boolean,
    errorMsg: string
}>

export interface UpdateNewMovieCardAction {
    type: typeof movieCardActions.updateNewMovieCard;
    payload: Model.INewMovieCard;
}

export interface AddMovieCardAction {
    type: typeof movieCardActions.addMovieCard;
    payload: Model.IMovieCard;
}

export interface AddMovieCardEntitiesAction {
    type: typeof movieCardActions.addMovieCardEntities;
    payload: Model.IMovieCardEntity[];
}

export interface RemoveMovieCardAction {
    type: typeof movieCardActions.removeMovieCard;
    payload: string;
}

export interface UpdateSelectableActorsAction {
    type: typeof movieCardActions.updateSelectableActors;
    payload: IActor[];
}

export interface UpdateSelectableDirectorsAction {
    type: typeof movieCardActions.updateSelectableDirectors;
    payload: IDirector[];
}

export interface UpdateErrorStateAction {
    type: typeof movieCardActions.updateErrorState;
    payload: { isError: boolean, msg: string };
}


export type MovieCardActionType = (
    UpdateNewMovieCardAction |
    AddMovieCardAction |
    AddMovieCardEntitiesAction |
    RemoveMovieCardAction |
    UpdateSelectableActorsAction |
    UpdateSelectableDirectorsAction |
    UpdateErrorStateAction
);