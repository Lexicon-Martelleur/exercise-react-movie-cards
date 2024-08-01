import React, { useContext } from "react";

import { MovieCardActionType, IMovieCardState, } from "../state";

export const MovieCardContext = React.createContext<[
    React.Dispatch<MovieCardActionType>,
    IMovieCardState
] | null>(null);

export const useMovieCardContext = () => {
    const contextValue = useContext(MovieCardContext);
    if (contextValue == null) {
        throw new Error("useMovieCardContext must be used within a Provider");
    }
    return contextValue;
}
