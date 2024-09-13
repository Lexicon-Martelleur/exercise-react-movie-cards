import React, { ReactElement, useCallback, useReducer } from "react";

import { MovieCardContext } from "../context";
import * as State from "../state";
import { ErrorModal } from "../../../components";

interface Props {
  children?: React.ReactNode;
}

export const MovieCardProvider: React.FC<Props> = ({
	children
}): ReactElement => {
	const [
		movieState,
		dispatchMovieAction
	] = useReducer(State.movieCardReducer, State.movieCardInitData);

	const clearErrorState = useCallback(() => {
		dispatchMovieAction(State.clearErrorStateAction());
	}, [dispatchMovieAction]);

	if (movieState.isError) {
		return <ErrorModal
			title={"Error"}
			message={movieState.errorMsg}
			onClose={clearErrorState} />;
	}

	return (
		<MovieCardContext.Provider value={[dispatchMovieAction, movieState]}>
			{children}
		</MovieCardContext.Provider>
	);
};
