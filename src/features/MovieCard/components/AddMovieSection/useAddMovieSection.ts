import { useState } from "react";

export type AddMovieHook = ReturnType<typeof useAddMovieSection>

export const useAddMovieSection = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => {
        setIsFormOpen(preValue => !preValue);
    };

    const updateFormOpen = (open: boolean) => {
        setIsFormOpen(open);
    };

    return {
        isFormOpen,
        toggleForm,
        updateFormOpen
    };
};
