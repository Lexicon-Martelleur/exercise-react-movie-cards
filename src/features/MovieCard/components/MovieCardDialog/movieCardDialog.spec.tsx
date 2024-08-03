import { render, screen, fireEvent } from "@testing-library/react";

import { MovieCardDialog } from "./MovieCardDialog";
import { mockMovieCardEntity } from "../../__test__/mock";

jest.mock("./useMovieCardDialog");
jest.mock("../../state");

describe("MovieCardDialog", () => {
	const closeMock = jest.fn();
	const confirmMock = jest.fn();

	it(`calls close
		when the close is slected`, () => {
		renderMovieCardDialog();
		fireEvent.click(screen.getByTestId("close-btn"));
		expect(closeMock).toHaveBeenCalledTimes(1);
	});

	it(`calls confirm
				when the confirm is selected`, () => {
		renderMovieCardDialog();
		fireEvent.click(screen.getByTestId("confirm-btn"));
		expect(confirmMock).toHaveBeenCalledTimes(1);
	});

	function renderMovieCardDialog(): void {
		render(
			<MovieCardDialog
				open={true}
				movieCardEntity={mockMovieCardEntity}
				onClose={closeMock}
				onConfirm={confirmMock}
			/>
		);
	}
});
