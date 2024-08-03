import { FormEventHandler, useState } from "react";

import { useMovieCardContext } from "../../context";
import { createMovieCardObject, getEmptyMovieCard } from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";

export const useAddMovie = () => {
    const [dispatchMovieCardAction, movieCardState] = useMovieCardContext();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const movieCard = createMovieCardObject({
            title: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.title)),
            rating: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.rating)),
            genre: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.genre)),
            description: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.description)),
        });
        
        fakeLoading();
        dispatchMovieCardAction(addMovieCardAction(movieCard));
    }

    const fakeLoading = () => {
        const timeout = setTimeout(() => {
            setIsLoading(false);
            if (closeFormOnSubmit) {
                setIsFormOpen(false);
                setCloseFormOnSubmit(false);
                dispatchMovieCardAction(updateNewMovieCardAction(getEmptyMovieCard()));
            }
            clearTimeout(timeout);
        }, 2000);
    }

    const handleChange = (formElement: HTMLFormElement | null) => {
        if (formElement == null) { return; }
        const movieCard = createMovieCardObject({
            title: getInputValue(formElement.elements.namedItem(movieFormInputNames.title)),
            rating: getInputValue(formElement.elements.namedItem(movieFormInputNames.rating)),
            genre: getInputValue(formElement.elements.namedItem(movieFormInputNames.genre)),
            description: getInputValue(formElement.elements.namedItem(movieFormInputNames.description)),
        });
        dispatchMovieCardAction(updateNewMovieCardAction(movieCard));
    }

    const handleClearForm = () => {
        dispatchMovieCardAction(updateNewMovieCardAction(getEmptyMovieCard()));
    }

    const handlePreSubmit = (close: boolean) => {
        setCloseFormOnSubmit(close);
    }

    const getInputValue = (item: unknown) => {
        return (item instanceof HTMLInputElement ||
            item instanceof HTMLTextAreaElement ||
            item instanceof HTMLSelectElement)
            ? item.value
            : "";
    }

    const toggleForm = () => {
        setIsFormOpen(preValue => !preValue);
    }

    return {
        isFormOpen,
        isLoading,
        movieCardState,
        toggleForm,
        handleClearForm,
        handleChange,
        handleSubmit,
        handlePreSubmit
    }
}