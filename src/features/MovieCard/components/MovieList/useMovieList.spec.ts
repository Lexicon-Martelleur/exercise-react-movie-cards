import { renderHook, act } from "@testing-library/react";

import { useMovieList } from "./useMovieList";
import { mockMovieCardEntity } from "../../__test__/mock";
import { useMovieCardContext } from "../../context";
import { IMovieCardEntity } from "../../../../types";

jest.mock("../../context");

describe("useMovieList", () => {
    const mockDispatch = jest.fn();
    const movieCards: IMovieCardEntity[] = []; 
    
    beforeEach(() => {
        (useMovieCardContext as jest.Mock).mockReturnValue([
            mockDispatch,
            { movieCards }
        ]);
    });

    describe("handleSelectedMovieCard", () => {
        it("set selected movie", () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleSelectMovieCard(mockMovieCardEntity);
            });
            expect(result.current.selectedMovieCard).toBe(mockMovieCardEntity);
        });

        it("set selected card dialog to open", () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleSelectMovieCard(mockMovieCardEntity);
            });
            expect(result.current.isMovieCardDialogOen).toBe(true);
        });
    });

    describe("handleCloseMovieCardDialog", () => {
        it("set selected movie to null", () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleCloseMovieCardDialog();
            });
            expect(result.current.selectedMovieCard).toBe(null);
        });

        it("set selected card dialog to closed", () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleCloseMovieCardDialog();
            });
            expect(result.current.isMovieCardDialogOen).toBe(false);
        });
    });

    describe("handleConfirm", () => {
        it(`does nothing
            if movie card is not selected`, () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleConfirm();
            });
            expect(mockDispatch).toHaveBeenCalledTimes(0);
        });

        it(`dispatch movie card action
            if movie card is selected`, () => {
            const { result } = renderMovieListHook();
            act(() => {
                result.current.handleSelectMovieCard(mockMovieCardEntity);
            });
            act(() => {
                result.current.handleConfirm();
            });
            expect(mockDispatch).toHaveBeenCalledTimes(1);
        });

        it(`set selected movie to null
            if movie card is selected`, () => {
            const { result } = renderMovieListHook();
            act(() => {
              result.current.handleCloseMovieCardDialog();
            });
            expect(result.current.selectedMovieCard).toBe(null);
        });

        it(`set selected card dialog to closed
            if movie card is selected`, () => {
            const { result } = renderMovieListHook();
            act(() => {
                result.current.handleSelectMovieCard(mockMovieCardEntity);
            });
            act(() => {
                result.current.handleConfirm();
            });
            expect(result.current.isMovieCardDialogOen).toBe(false);
        });
    });

    describe("getMoviCards", () => {
        it("return the current moviecards", () => {
            const { result } = renderMovieListHook();
            expect(result.current.getMovieCards()).toBe(movieCards);
        })
    })
})

function renderMovieListHook () {
    return renderHook(() => useMovieList());
}
