import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import { MovieCard } from "./MovieCard";
import { mockMovieCardEntity } from "../../__test__/mock";

jest.mock("../../state");

describe("MovieCardDialog", () => {
  const selectMock = jest.fn();
  
  it(`calls select moviecard
    when a movie card is selected`, () => {
    renderCardDialog();
    fireEvent.click(screen.getByTestId("movie-card"));
    expect(selectMock).toHaveBeenCalledTimes(1);
  });
  
  function renderCardDialog (): void {
    render(
      <MovieCard
        movieCardEntity={mockMovieCardEntity}
        onSelect={selectMock}
      />
    );
  }
});
