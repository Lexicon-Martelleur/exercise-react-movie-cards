import { getNewEmptyMovieCard } from "../../../service";
import { IMovieCardState } from "./types";

export const movieCardInitData: IMovieCardState = {
    newMovieCard: getNewEmptyMovieCard(),
    selectableActors: [],
    selectableDirectors: [],
    isError: false,
    errorMsg: ""
} as const;
