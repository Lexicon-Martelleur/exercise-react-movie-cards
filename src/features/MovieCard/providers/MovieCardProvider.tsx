import React, { ReactElement, useEffect, useMemo, useReducer, useRef } from "react";

import { MovieCardContext } from "../context";
import { movieCardReducer, movieCardInitData } from "../state";
import { useMovieQuery } from "../hooks";

interface Props {
  children?: React.ReactNode;
}

export const MovieCardProvider: React.FC<Props> = ({
    children
}): ReactElement => {
  const [
    movieCardState,
    dispatchMovieCardAction
  ] = useReducer(movieCardReducer, movieCardInitData);

  const movieQueryHook = useMovieQuery(dispatchMovieCardAction)

  useEffect(() => {
    movieQueryHook.getTodos();
  }, [movieQueryHook]);

  return (
    <MovieCardContext.Provider value={[dispatchMovieCardAction, movieCardState]}>
      {children}
    </MovieCardContext.Provider>
  );
}
