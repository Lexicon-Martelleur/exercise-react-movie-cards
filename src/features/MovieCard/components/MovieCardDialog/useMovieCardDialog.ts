import { useEffect } from "react";

export const useMovieCardDialog = (
    dialog: React.MutableRefObject<HTMLDialogElement | null>,
    open: boolean
) => {
    useEffect(() => {
        if (dialog.current == null ) { return; }
        if (open) {
            dialog.current.showModal();
        } else {
            dialog.current.close();
        }
    }, [open]);
};
