import { useStarRating } from "./useStarRating";

describe("useStarRating", () => {
    const mockUpdate = jest.fn();
    const mockValue = 2;

    describe("handleRating", () => {
        it(`call update rating
            when update action is provided`, () => {
            const starRating = useStarRating();
            starRating.handleRating(mockValue, mockUpdate);
            expect(mockUpdate).toHaveBeenCalledTimes(1);
            expect(mockUpdate).toHaveBeenCalledWith(mockValue);
        });
    
        it(`does nothing
            when update action is not provided`, () => {
            const starRating = useStarRating();
            starRating.handleRating(mockValue);
            expect(mockUpdate).toHaveBeenCalledTimes(0);
        });
    })
})