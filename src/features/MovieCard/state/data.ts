import { getEmptyMovieCard } from "../../../service";
import { IMovieCardState } from "./types";

export const movieCardInitData: IMovieCardState = {
    newMovieCard: getEmptyMovieCard(),
    movieCards: []
} as const;
