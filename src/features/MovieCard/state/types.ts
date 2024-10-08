import * as Model from "../../../model";
import { movieCardActions } from "./constants";

export type IMovieCardState = Readonly<{
    newMovieCard: Model.INewMovieCard;
    createdMovieCard?: Model.IMovieCardEntity | null;
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

export interface UpdateCreatedMovieCardAction {
    type: typeof movieCardActions.updateCreatedMovieCard;
    payload: Model.IMovieCardEntity | null;
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
    UpdateCreatedMovieCardAction |
    UpdateSelectableActorsAction |
    UpdateSelectableDirectorsAction |
    UpdateSelectableGenresAction |
    UpdateErrorStateAction
);