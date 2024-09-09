import * as Model from "../../../model";
import { movieCardActions } from "./constants";

export type IMovieCardState = Readonly<{
    newMovieCard: Model.INewMovieCard;
    selectableActors: Model.IActor[];
    selectableDirectors: Model.IDirector[];
    selectableGenres: Model.IGenre[];
    isError: boolean,
    errorMsg: string
}>

export interface UpdateNewMovieCardAction {
    type: typeof movieCardActions.updateNewMovieCard;
    payload: Model.INewMovieCard;
}

export interface UpdateSelectableActorsAction {
    type: typeof movieCardActions.updateSelectableActors;
    payload: Model.IActor[];
}

export interface UpdateSelectableDirectorsAction {
    type: typeof movieCardActions.updateSelectableDirectors;
    payload: Model.IDirector[];
}

export interface UpdateSelectableGenresAction {
    type: typeof movieCardActions.updateSelectableGenres;
    payload: Model.IGenre[];
}

export interface UpdateErrorStateAction {
    type: typeof movieCardActions.updateErrorState;
    payload: { isError: boolean, msg: string };
}


export type MovieCardActionType = (
    UpdateNewMovieCardAction |
    UpdateSelectableActorsAction |
    UpdateSelectableDirectorsAction |
    UpdateSelectableGenresAction |
    UpdateErrorStateAction
);