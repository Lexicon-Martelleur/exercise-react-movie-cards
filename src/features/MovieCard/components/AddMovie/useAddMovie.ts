import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

import { useMovieCardContext } from "../../context";
import { createMovieCardObject, getEmptyMovieCard } from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";

export const useAddMovie = () => {
    const [dispatchMovieCardAction, movieCardState] = useMovieCardContext();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitResult, setSubmitResult] = useState<string | null>(null);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
    const submitResultTimeout = useRef<NodeJS.Timeout | null>(null);

    const clearLoadingTimout = useCallback(() => {
        if (loadingTimeout.current != null) {
            clearTimeout(loadingTimeout.current);
        }
    }, [])

    const clearSubmitResultTimout = useCallback(() => {
        if (submitResultTimeout.current != null) {
            clearTimeout(submitResultTimeout.current);
        }
    }, [])

    useEffect(() => {
        return () => {
            clearLoadingTimout();
            clearSubmitResultTimout();
        }
    }, [])

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
        clearLoadingTimout();
        loadingTimeout.current = setTimeout(() => {
            setIsLoading(false);
            manageSubmitResult("Success ✅");
            if (closeFormOnSubmit) {
                setIsFormOpen(false);
                setCloseFormOnSubmit(false);
                dispatchMovieCardAction(updateNewMovieCardAction(getEmptyMovieCard()));
                setSubmitResult(null);
            }
        }, 2000);
    }

    const manageSubmitResult = (result: string) => {
        setSubmitResult(result)
        clearSubmitResultTimout();
        submitResultTimeout.current = setTimeout(() => {
            setSubmitResult(null);
        }, 5000);
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
        setSubmitResult(null);
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

    const updateSubmitResult = (result: string | null) => {
        setSubmitResult(result);
    }

    return {
        isFormOpen,
        isLoading,
        movieCardState,
        submitResult,
        toggleForm,
        handleClearForm,
        handleChange,
        handleSubmit,
        handlePreSubmit,
        updateSubmitResult
    }
}