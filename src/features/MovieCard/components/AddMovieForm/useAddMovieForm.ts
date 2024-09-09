import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

import { useMovieCardContext } from "../../context";
import * as Service from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";
import { useMovieQuery } from "../../hooks";
import { getMovieAPI } from "../../../../config";

export type AddMovieFormHook = ReturnType<typeof useAddMovieForm>

export const useAddMovieForm = () => {
    const [dispatchMovieAction] = useMovieCardContext();
    const movieQueryHook = useMovieQuery(dispatchMovieAction);
    const isPending = movieQueryHook.isPending()
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const [submitResult, setSubmitResult] = useState<string | null>(null);
    const submitResultTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const errorMsg = `Could not load form data from ${getMovieAPI()}`
        movieQueryHook.getActors(errorMsg);
        movieQueryHook.getDirectors(errorMsg);
    }, [movieQueryHook.getActors, movieQueryHook.getDirectors]);

    const clearSubmitResultTimout = useCallback(() => {
        if (submitResultTimeout.current != null) {
            clearTimeout(submitResultTimeout.current);
        }
    }, [])

    useEffect(() => {
        return () => {
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

    const handleChange = useCallback((formElement: HTMLFormElement | null) => {
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
    }, [Service.createNewMovieCardObject, dispatchMovieAction, updateNewMovieCardAction])

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
        isPending,
        submitResult,
        handleClearForm,
        handleSubmit,
        handleChange,
        handlePreSubmit,
        updateSubmitResult
    }
}