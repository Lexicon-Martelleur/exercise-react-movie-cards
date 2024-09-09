import {
    selectTitle,
    selectDescription,
    selectRating
} from "../state";
import { mockMovieCardEntity } from "./mock";

describe("MovieCard state", () => {
    describe.skip("reducer", () => {})
    
    describe("selectTitle", () => {
        it("return title for movie card", () => {
            const statePart = selectTitle(mockMovieCardEntity);
            expect(statePart).toBe(mockMovieCardEntity.moviecard.title);
        })
    })

    describe("selectRating", () => {
        it("return title for movie card", () => {
            const statePart = selectRating(mockMovieCardEntity);
            expect(statePart).toBe(mockMovieCardEntity.moviecard.rating);
        })
    })

    describe("selectDescription", () => {
        it("return title for movie card", () => {
            const statePart = selectDescription(mockMovieCardEntity);
            expect(statePart).toBe(mockMovieCardEntity.moviecard.description);
        })
    })

    describe.skip("updateNewMovieCard", () => {
    })
})