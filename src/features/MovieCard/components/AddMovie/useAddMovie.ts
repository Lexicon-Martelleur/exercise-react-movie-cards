import { FormEventHandler, useState } from "react";

import { IMovieFormInputName } from "../types";
import { useMovieCardContext } from "../../context";
import { createMovieCardObject, getEmptyMovieCard } from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";

export const useAddMovie = () => {
    const inputNames: IMovieFormInputName = {
        title: "title",
        rating: "rating",
        genre: "genre",
        description: "description"
    };
    const [dispatchMovieCardAction, movieCardState] = useMovieCardContext();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setIsLoading(true);
        const movieCard = createMovieCardObject({
            title: getInputValue(event.currentTarget.elements.namedItem(inputNames.title)),
            rating: getInputValue(event.currentTarget.elements.namedItem(inputNames.rating)),
            genre: getInputValue(event.currentTarget.elements.namedItem(inputNames.genre)),
            description: getInputValue(event.currentTarget.elements.namedItem(inputNames.description)),
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

    const handleChange = (formElement: HTMLFormElement) => {
        const movieCard = createMovieCardObject({
            title: getInputValue(formElement.elements.namedItem(inputNames.title)),
            rating: getInputValue(formElement.elements.namedItem(inputNames.rating)),
            genre: getInputValue(formElement.elements.namedItem(inputNames.genre)),
            description: getInputValue(formElement.elements.namedItem(inputNames.description)),
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
        inputNames,
        movieCardState,
        toggleForm,
        handleClearForm,
        handleChange,
        handleSubmit,
        handlePreSubmit
    }
}