import { FormEventHandler, ReactElement, useContext, useState } from "react";

import { FormExpander } from "../FormExpander";
import { AddMovieForm } from "../AddMovieForm";
import { IMovieFormInputName } from "../types";
import { MovieCardContext } from "../../context";
import { createMovieCardObject, getEmptyMovieCard } from "../../../../service";
import { addMovieCardAction, updateNewMovieCardAction } from "../../state";
import styles from "./AddMovie.module.css";

export const AddMovie = (): ReactElement => {
    const inputNames: IMovieFormInputName = {
        title: "title",
        rating: "rating",
        genre: "genre",
        description: "description"
    }
    const [
        dispatchMovieCardAction,
        movieCardState
    ] = useContext(MovieCardContext);

    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const movieCard = createMovieCardObject({
            title: getInputValue(event.currentTarget.elements.namedItem(inputNames.title)),
            rating: getInputValue(event.currentTarget.elements.namedItem(inputNames.rating)),
            genre: getInputValue(event.currentTarget.elements.namedItem(inputNames.genre)),
            description: getInputValue(event.currentTarget.elements.namedItem(inputNames.description)),
        });
        
        dispatchMovieCardAction(addMovieCardAction(movieCard));
        dispatchMovieCardAction(updateNewMovieCardAction(getEmptyMovieCard()));
    }

    const handleChange = (formElement: HTMLFormElement) => {
        const movieCard = createMovieCardObject({
            title: getInputValue(formElement.elements.namedItem(inputNames.title)),
            rating: getInputValue(formElement.elements.namedItem(inputNames.rating)),
            genre: getInputValue(formElement.elements.namedItem(inputNames.genre)),
            description: getInputValue(formElement.elements.namedItem(inputNames.description)),
        });
        dispatchMovieCardAction(updateNewMovieCardAction(movieCard))
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

    return (
        <section className={styles.addMovieSection}>
            <FormExpander title={"Create Movie Card"}
                isFormOpen={isFormOpen}
                toggleForm={toggleForm}/>
            {isFormOpen && <AddMovieForm
                inputNames={inputNames}
                inputState={movieCardState.newMovieCard}
                handleChange={handleChange}
                handleSubmit={handleSubmit}/>}
        </section>
    );
}