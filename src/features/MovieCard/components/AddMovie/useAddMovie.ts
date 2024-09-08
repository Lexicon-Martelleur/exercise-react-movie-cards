import { useState } from "react";

export type AddMovieHook = ReturnType<typeof useAddMovie>

export const useAddMovie = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(preValue => !preValue);
    }

    return {
        isFormOpen,
        toggleForm,
    };
}
