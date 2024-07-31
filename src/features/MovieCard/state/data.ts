import * as service from "../../../service"
import { IMovieCardState } from "./types"

export const movieCardInitData: IMovieCardState = {
    newMovieCard: service.getEmptyMovieCard(),
    movieCards: service.getAllMovieCards() 
};
