import { renderHook } from "@testing-library/react";

import { useMovieCardDialog } from "./useMovieCardDialog"; 

describe("useMovieCard", () => {
    let dialogElement: HTMLDialogElement
    let dialog: React.MutableRefObject<HTMLDialogElement | null>;

    beforeEach(() => {
        dialogElement = { showModal: jest.fn(), close: jest.fn() } as unknown as HTMLDialogElement;
        dialog = { current: dialogElement };
    });

    it(`call showModal
        when open is true`, () => {
        renderMovieCardHook(dialog, true);
        expect(dialogElement.showModal).toHaveBeenCalledTimes(1);
    })

    it(`call close
        when open is false`, () => {
        renderMovieCardHook(dialog, false);
    })

    it(`does nothing
        when dialog element is null`, () => {
        const nullDialog = { current: null };
        renderMovieCardHook(nullDialog, false);
        expect(dialogElement.showModal).toHaveBeenCalledTimes(0);
        expect(dialogElement.close).toHaveBeenCalledTimes(0);
    })
})

function renderMovieCardHook (
    dialog: React.MutableRefObject<HTMLDialogElement | null>,
    open: boolean
): void {
    renderHook(({ open }) =>
        useMovieCardDialog(dialog, open), {
            initialProps: { open },
        }
    );
}
