import {
    movieCardReducer,
    addMovieCardAction,
    movieCardActions,
    removeMovieCardAction,
    updateNewMovieCardAction,
    selectTitle,
    selectGenre,
    selectDescription,
    selectRating
} from "../state";
import { mockMovieCardEntity, mockMovieCardTwo, mocMovieCardState } from "./mock";

describe("MovieCard state", () => {
    describe("reducer", () => {
        it(`return new state with new movie card
            when action update new movie card is used`, () => {
            const action = updateNewMovieCardAction(
                mockMovieCardTwo
            );
            const newState = movieCardReducer(
                mocMovieCardState,
                action
            );
            expect(newState.newMovieCard).toBe(mockMovieCardTwo);
        })

        it(`return new state with added movie card to movie card list
            when action add movie card is used`, () => {
            const action = addMovieCardAction(
                mockMovieCardTwo
            );
            const newState = movieCardReducer(
                mocMovieCardState,
                action
            );
            expect(newState.movieCards.map(entity => (
                entity.moviecard
            ))).toContain(mockMovieCardTwo);
        })

        it(`return new state with removed movie card from movie card list
            when action remove movie card is used`, () => {
            const removeMovieCardWithId = mocMovieCardState.movieCards[0].id;
            const action = removeMovieCardAction(
                removeMovieCardWithId
            );
            const newState = movieCardReducer(
                mocMovieCardState,
                action
            );
            
            expect(newState.movieCards.map(entity => (
                entity.id
            ))).not.toContain(removeMovieCardWithId);
        })
    })
    
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

    describe("selectGenre", () => {
        it("return title for movie card", () => {
            const statePart = selectGenre(mockMovieCardEntity);
            expect(statePart).toBe(mockMovieCardEntity.moviecard.genre);
        })
    })

    describe("selectDescription", () => {
        it("return title for movie card", () => {
            const statePart = selectDescription(mockMovieCardEntity);
            expect(statePart).toBe(mockMovieCardEntity.moviecard.description);
        })
    })

    describe("updateNewMovieCard", () => {
        it(`return action of type update new movie card
            with payload value given from input`, () => {
            const action = updateNewMovieCardAction(
                mockMovieCardTwo
            );
            expect(action.type).toBe(movieCardActions.updateNewMovieCard);
            expect(action.payload).toBe(mockMovieCardTwo);
        })
    })

    describe("addMovieCardAction", () => {
        it(`return action of type add movie card
            with payload value given from input`, () => {
            const action = addMovieCardAction(
                mockMovieCardTwo
            );
            expect(action.type).toBe(movieCardActions.addMovieCard);
            expect(action.payload).toBe(mockMovieCardTwo);
        })
    })
    
    describe("addMovieCardAction", () => {
        it(`return action of type remove movie card
            with payload value given from input`, () => {
            const mockId = "1";
            const action = removeMovieCardAction(
                mockId
            );
            expect(action.type).toBe(movieCardActions.removeMovieCard);
            expect(action.payload).toBe(mockId);
        })
    })
})