import { FormEventHandler, useCallback, useEffect, useRef, useState } from "react";

import { useMovieCardContext } from "../../context";
import * as Service from "../../../../service";
import { updateNewMovieCardAction } from "../../state";
import { movieFormInputNames } from "../constants";
import { useMovieQuery } from "../../hooks";
import { getMovieAPI } from "../../../../config";
import { INewMovieCard } from "../../../../model";

export type AddMovieFormHook = ReturnType<typeof useAddMovieForm>

export const useAddMovieForm = () => {
    const [dispatchMovieAction] = useMovieCardContext();
    const movieQueryHook = useMovieQuery(dispatchMovieAction);
    const isPending = movieQueryHook.isPending()
    const [closeFormOnSubmit, setCloseFormOnSubmit] = useState(false);
    const submitResultTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const errorMsg = `Could not load form data from ${getMovieAPI()}`
        movieQueryHook.getActors(errorMsg);
        movieQueryHook.getDirectors(errorMsg);
        movieQueryHook.getGenres(errorMsg);
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
        submit(newMovieCard)
    }

    const submit = (newMovieCard: INewMovieCard) => {
        movieQueryHook.createMovieCard(newMovieCard);
        if (closeFormOnSubmit) {
            setCloseFormOnSubmit(false);
            dispatchMovieAction(updateNewMovieCardAction(Service.getNewEmptyMovieCard()));
        }
    }

    const handleChange = useCallback((formElement: HTMLFormElement | null) => {
        if (formElement == null) { return; }
        const actors = getInputValue(formElement.elements.namedItem(movieFormInputNames.actors)) !== ""
            ? getInputValue(formElement.elements.namedItem(movieFormInputNames.actors)).split(",")
            : [];
        const genres = getInputValue(formElement.elements.namedItem(movieFormInputNames.genres)) !== ""
            ? getInputValue(formElement.elements.namedItem(movieFormInputNames.genres)).split(",")
            : [];
        const newMovieCard = Service.createNewMovieCardObject({
            title: getInputValue(formElement.elements.namedItem(movieFormInputNames.title)),
            timeStamp: Service.getUNIXTimestampInSeconds(),
            description: getInputValue(formElement.elements.namedItem(movieFormInputNames.description)),
            director: getInputValue(formElement.elements.namedItem(movieFormInputNames.director)),
            actors,
            genres,
            rating: Number(getInputValue(formElement.elements.namedItem(movieFormInputNames.rating))),
        });
        dispatchMovieAction(updateNewMovieCardAction(newMovieCard));
    }, [Service.createNewMovieCardObject, dispatchMovieAction, updateNewMovieCardAction])

    const handleClearForm = () => {
        dispatchMovieAction(updateNewMovieCardAction(Service.getNewEmptyMovieCard()));
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

    return {
        isPending,
        handleClearForm,
        handleSubmit,
        handleChange,
        handlePreSubmit
    }
}