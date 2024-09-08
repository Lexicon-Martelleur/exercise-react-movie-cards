import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

import { useMovieCardContext } from "../../context";
import * as Service from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";
import { useMovieQuery } from "../../hooks";

export type AddMovieFormHook = ReturnType<typeof useAddMovieForm>

export const useAddMovieForm = () => {
    const [dispatchMovieAction] = useMovieCardContext();
    const movieQueryHook = useMovieQuery(dispatchMovieAction)
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const [submitResult, setSubmitResult] = useState<string | null>(null);
    const loadingTimeout = useRef<NodeJS.Timeout | null>(null);
    const submitResultTimeout = useRef<NodeJS.Timeout | null>(null);
    const isLoading = false;

    useEffect(() => {
        movieQueryHook.getActors();
    }, [movieQueryHook.getActors]);

    useEffect(() => {
        movieQueryHook.getDirectors();
    }, [movieQueryHook.getDirectors]);

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
        const newMovieCard = Service.createNewMovieCardObject({
            title: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.title)),
            timeStamp: Service.getUNIXTimestampInSeconds(),
            description: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.description)),
            director: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.director)),
            actors: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.actors)).split(","),
            rating: Number(getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.rating))),
            genres: getInputValue(event.currentTarget.elements.namedItem(movieFormInputNames.genres)).split(","),
        });
        submit();
        dispatchMovieAction(addMovieCardAction(newMovieCard));
    }

    const handleChange = (formElement: HTMLFormElement | null) => {
        if (formElement == null) { return; }
        const newMovieCard = Service.createNewMovieCardObject({
            title: getInputValue(formElement.elements.namedItem(movieFormInputNames.title)),
            timeStamp: Service.getUNIXTimestampInSeconds(),
            description: getInputValue(formElement.elements.namedItem(movieFormInputNames.description)),
            director: getInputValue(formElement.elements.namedItem(movieFormInputNames.director)),
            actors: getInputValue(formElement.elements.namedItem(movieFormInputNames.actors)).split(","),
            rating: Number(getInputValue(formElement.elements.namedItem(movieFormInputNames.rating))),
            genres: getInputValue(formElement.elements.namedItem(movieFormInputNames.genres)).split(",")
        });
        dispatchMovieAction(updateNewMovieCardAction(newMovieCard));
    }

    const submit = () => {
        manageSubmitResult("Success ✅");
        if (closeFormOnSubmit) {
            setCloseFormOnSubmit(false);
            dispatchMovieAction(updateNewMovieCardAction(Service.getNewEmptyMovieCard()));
            setSubmitResult(null);
        }
    }

    const manageSubmitResult = (result: string) => {
        setSubmitResult(result)
        clearSubmitResultTimout();
        submitResultTimeout.current = setTimeout(() => {
            setSubmitResult(null);
        }, 5000);
    }

    const handleClearForm = () => {
        dispatchMovieAction(updateNewMovieCardAction(Service.getNewEmptyMovieCard()));
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

    const updateSubmitResult = (result: string | null) => {
        setSubmitResult(result);
    }

    return {
        isLoading,
        submitResult,
        handleClearForm,
        handleSubmit,
        handleChange,
        handlePreSubmit,
        updateSubmitResult
    }
}