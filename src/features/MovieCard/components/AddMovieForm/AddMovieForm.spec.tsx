import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { AddMovieForm } from './AddMovieForm';
import * as service from "../../../../service";
import { movieFormInputNames } from "../constants";

jest.mock('../../../../service');

jest.mock('../StarRating', () => ({
    StarRating: ({ rating, updateRating }: {
        rating: number,
        updateRating: (value: number) => void
    }) => (
        <div data-testid="star-rating"
            onClick={_ => updateRating(rating)}>
        </div>
    )
}));

describe("AddMovieForm", () => {
    const mockFormInputState: service.IMovieCard = {
        title: "mock",
        rating: 2,
        genre: "Action",
        description: "Mock description"
    };

    const mockOnClear = jest.fn();
    const mockOnChange = jest.fn();
    const mockOnSubmit = jest.fn((event) => event.preventDefault());
    const mockOnPreSubmit = jest.fn();

    it.each([
        { inputId: movieFormInputNames.title },
        { inputId: movieFormInputNames.rating },
        { inputId: movieFormInputNames.genre },
        { inputId: movieFormInputNames.description },
    ])("call form change when input change is triggered", ({ inputId }) => {
        renderAddMovieForm();
        const input = screen.getByTestId(inputId)
        fireEvent.change(input, { target: { value: "new mock value" } })
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it("call form change when rating is updated", () => {
        renderAddMovieForm();
        const starRating = screen.getByTestId("star-rating");
        fireEvent.click(starRating);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it.each([
        { buttonId: "submit-btn", closeForm: false },
        { buttonId: "submit-btn-with-close", closeForm: true },
    ])("submit the form when submit is selected", ({ buttonId, closeForm }) => {
        renderAddMovieForm();
        const submitButton = screen.getByTestId(buttonId);
        fireEvent.mouseDown(submitButton);
        fireEvent.click(submitButton);
        expect(mockOnPreSubmit).toHaveBeenCalledWith(closeForm);
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it("clear the form when clear is selected", () => {
        renderAddMovieForm();
        const clearButton = screen.getByTestId("clear-button");
        fireEvent.click(clearButton);
        expect(mockOnClear).toHaveBeenCalledTimes(1);
    });

    it(`disables submit elements
        when loading state is true`, () => {
        const isLoading = true;
        renderAddMovieForm(isLoading);
        const submitButton = screen.getByTestId("submit-btn") as unknown as HTMLButtonElement;
        const submitAndCloseButton = screen.getByTestId("submit-btn-with-close") as unknown as HTMLButtonElement;
        expect(submitButton.disabled).toBeTruthy();
        expect(submitAndCloseButton.disabled).toBeTruthy();
    });

    it(`display submit result
        when form is not longer loading`, () => {
        const isLoading = false;
        renderAddMovieForm(isLoading, "result");
        const submitResult = screen.getByTestId("submit-result");
        expect(submitResult).toBeInTheDocument();
    });

    function renderAddMovieForm(
        isLoading = false,
        submitResult: string | null = null) {
        return render(
            <AddMovieForm
                formInputState={mockFormInputState}
                isLoading={isLoading}
                submitResult={submitResult}
                onClear={mockOnClear}
                onChange={mockOnChange}
                onSubmit={mockOnSubmit}
                onPreSubmit={mockOnPreSubmit}
            />
        );
    }
});
