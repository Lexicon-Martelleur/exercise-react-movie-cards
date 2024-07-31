import {
    movieCardInitData,
    MovieCardActionType,
    IMovieCardState,
} from "../state";
import React from "react";
  
const defaultDispatch: React.Dispatch<MovieCardActionType> = () => movieCardInitData;
  
export const MovieCardContext = React.createContext<[
    React.Dispatch<MovieCardActionType>,
    IMovieCardState
]>([defaultDispatch, movieCardInitData]);
