import * as Model from "../../../model";
import { IActor, IDirector } from "../../../model";
import { movieCardActions } from "./constants";

export type IMovieCardState = Readonly<{
    newMovieCard: Model.INewMovieCard;
    selectableActors: IActor[];
    selectableDirectors: IDirector[];
    isError: boolean,
    errorMsg: string
}>

export interface UpdateNewMovieCardAction {
    type: typeof movieCardActions.updateNewMovieCard;
    payload: Model.INewMovieCard;
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
    UpdateSelectableActorsAction |
    UpdateSelectableDirectorsAction |
    UpdateErrorStateAction
);