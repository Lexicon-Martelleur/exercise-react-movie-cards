import { renderHook, act } from "@testing-library/react";

import { useAddMovie } from "./useAddMovie";
import { useMovieCardContext } from "../../context";
import { createMovieCardObject, getEmptyMovieCard } from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";

jest.mock("../../context");
jest.mock("../../state");
jest.mock("../../../../service");

describe("useAddMovie", () => {
    const mockDispatch = jest.fn();
    const mockAddMovieCardAction = { type: "mockAdd", payload: {} };
    const mockUpdateNewMovieCardAction = { type: "mockNewUpdate", payload: {} };
    const mockMovieCard = {
        title: "Mock Movie",
        rating: "Mock rating",
        genre: "Mock action",
        description: "Mock description"
    };
    
    const mockForm = {
        elements: {
            namedItem: jest.fn((name: string) => ({
                value: mockMovieCard[name as keyof typeof movieFormInputNames],
            }))
        }
    } as unknown as HTMLFormElement;

    const mockFormEvent = {
        preventDefault: jest.fn(),
        currentTarget: mockForm 
    } as unknown as React.FormEvent<HTMLFormElement>;

    beforeEach(() => {
        (addMovieCardAction as jest.Mock).mockReturnValue(mockAddMovieCardAction);
        (updateNewMovieCardAction as jest.Mock).mockReturnValue(mockUpdateNewMovieCardAction);
        (createMovieCardObject as jest.Mock).mockImplementation(() => mockMovieCard);
        (getEmptyMovieCard as jest.Mock).mockReturnValue({});
        (useMovieCardContext as jest.Mock).mockReturnValue([
            mockDispatch,
            { movieCards: [] }
        ]);
    });

    describe("handleChange", () => {
        it("dispatch update new movie card action", () => {
            const { result } = renderMovieAddHook();
            result.current.handleChange(mockForm);
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(mockUpdateNewMovieCardAction);
        })
    })

    describe("handleSubmit", () => {
        it("dispatch add movie card action", () => {
            const { result } = renderMovieAddHook();
            act(() => {
                result.current.handleSubmit(mockFormEvent);
            });
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(mockAddMovieCardAction);
        })
    })

    describe("handleClearForm", () => {
        it(`dispatch update new movie card action
            with default movie card payload`, () => {
            const { result } = renderMovieAddHook();
            result.current.handleClearForm();
            expect(mockDispatch).toHaveBeenCalledTimes(1);
            expect(mockDispatch).toHaveBeenCalledWith(mockUpdateNewMovieCardAction);
            expect(updateNewMovieCardAction).toHaveBeenCalledTimes(1);
            expect(updateNewMovieCardAction).toHaveBeenLastCalledWith(getEmptyMovieCard());
        })
    })

    describe("handleToggleForm", () => {
        it("toggle is form open state", () => {
            const { result } = renderMovieAddHook();
            const initValue = result.current.isFormOpen;
            act(() => {
                result.current.toggleForm();
            });
            expect(result.current.isFormOpen).toBe(!initValue);
            act(() => {
                result.current.toggleForm();
            });
            expect(result.current.isFormOpen).toBe(initValue);
        })
    })

    describe("handlePreSubmit", () => {
        it(`close form
            when the relative state is set to true after submission`, () => {
            const { result } = renderMovieAddHook();
            const closeOnSumbit = true;
            act(() => {
                result.current.toggleForm();
            });
            expect(result.current.isFormOpen).toBe(true);
            act(() => {
                result.current.handlePreSubmit(closeOnSumbit);
            });
            act(() => {
                result.current.handleSubmit(mockFormEvent);
                jest.runAllTimers();
            });
            expect(result.current.isFormOpen).toBe(false);
        })

        it(`do not close form
            when the realtive state is set to false after submission`, () => {
            const { result } = renderMovieAddHook();
            const closeOnSumbit = false;
            act(() => {
                result.current.toggleForm();
            });
            expect(result.current.isFormOpen).toBe(true);  
            act(() => {
                result.current.handlePreSubmit(closeOnSumbit);
            });
            act(() => {
                result.current.handleSubmit(mockFormEvent);
                jest.runAllTimers();
            });
            expect(result.current.isFormOpen).toBe(true);
        })
    })

    describe("updateSubmitResult", () => {
        it("update submit result", () => {
            const { result } = renderMovieAddHook();
            const mockResult = "mockResult";
            act(() => {
                result.current.updateSubmitResult(mockResult);
            });
            expect(result.current.submitResult).toBe(mockResult);            
        })

        it("submit result is set to null", () => {
            const { result } = renderMovieAddHook();
            expect(result.current.submitResult).toBe(null);
        })
    })
})

function renderMovieAddHook () {
    return renderHook(() => useAddMovie());
}
