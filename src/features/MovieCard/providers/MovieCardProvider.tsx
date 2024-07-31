import React, { ReactElement, useReducer } from "react";

import { MovieCardContext } from "../context";
import { movieCardReducer, movieCardInitData } from "../state";

interface Props {
  children?: React.ReactNode;
}

export const SessionMessageProvider: React.FC<Props> = ({
    children
}): ReactElement => {
  const [
    movieCardState,
    dispatchMovieCardAction
  ] = useReducer(movieCardReducer, movieCardInitData);

  return (
    <MovieCardContext.Provider value={[dispatchMovieCardAction, movieCardState]}>
      {children}
    </MovieCardContext.Provider>
  );
}
