import { FormEventHandler, ReactElement, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

import * as service from "../../../../service";
import { StarRating } from "../StarRating";
import { IMovieFormInputName } from "../types";
import styles from "./AddMovieForm.module.css";

interface Props {
    inputNames: IMovieFormInputName
    inputState: service.IMovieCard
    handleChange: (formElement: HTMLFormElement) => void
    handleSubmit: FormEventHandler<HTMLFormElement>
}

export const AddMovieForm: React.FC<Props> = ({
    inputNames,
    inputState,
    handleChange,
    handleSubmit
}): ReactElement => {
    const [rating, setRating] = useState(inputState.rating);
    const ratingInput = useRef<HTMLInputElement | null>(null);
    const formElement = useRef<HTMLFormElement | null>(null);

    const constructOptionElements = () => {
        return Object.values(service.movieGenre).map(value =>
            <option 
                key={uuid()}
                value={value.toLowerCase()}>
                {value}
            </option>
        );
    }

    const updateRating = (value: number) => {
        if (ratingInput.current == null) { return; }
        setRating(value);
        ratingInput.current.value = `${value}`;
        handleInputChange();
    }

    const handleInputChange = () => {
        if (formElement.current == null) { return; }
        handleChange(formElement.current);
    }

    return (
        <form onSubmit={handleSubmit} ref={formElement}>
            <fieldset className={styles.addMovieFieldset}>
                <legend>Create movie card</legend>
                <div>
                    <label htmlFor={inputNames.title}>Title</label>
                    <input type="text"
                        required
                        minLength={service.minLengthTitle}
                        maxLength={service.maxLengthTitle}
                        name={inputNames.title}
                        id={inputNames.title}
                        value={inputState.title}
                        onChange={_ => handleInputChange()}/>
                </div>
                <div>    
                    <label htmlFor={inputNames.rating}>Rating</label>
                    <StarRating rating={rating} updateRating={updateRating}/>
                    <input type="range"
                        required
                        hidden
                        ref={ratingInput}
                        value={inputState.rating}
                        min={service.minRating}
                        max={service.maxRating}
                        name={inputNames.rating}
                        id={inputNames.rating}
                        onChange={_ => handleInputChange()}/>
                </div>
                <div>
                    <label htmlFor={inputNames.genre}>Genre</label>
                    <select name={inputNames.genre}
                        required
                        id={inputNames.genre}
                        value={inputState.genre}
                        onChange={_ => handleInputChange()}>
                        {constructOptionElements()}
                    </select>
                </div>
                <div>
                    <label htmlFor={inputNames.description}>Description</label>
                    <textarea rows={5}
                        required
                        minLength={service.minLengthDescription}
                        maxLength={service.maxLengthDescription}
                        name={inputNames.description}
                        id={inputNames.description}
                        value={inputState.description}
                        onChange={_ => handleInputChange()} />
                </div>
                <button type="submit">Create Movie Card</button>
            </fieldset>
        </form>
    );
}