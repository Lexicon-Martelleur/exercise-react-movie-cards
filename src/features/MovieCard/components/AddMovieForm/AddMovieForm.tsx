import { FormEventHandler, ReactElement, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

import * as service from "../../../../service";
import { StarRating } from "../StarRating";
import { IMovieFormInputName } from "../types";
import styles from "./AddMovieForm.module.css";

interface Props {
    inputNames: IMovieFormInputName;
    inputState: service.IMovieCard;
    isLoading: boolean;
    onChange: (formElement: HTMLFormElement) => void;
    onSubmit: FormEventHandler<HTMLFormElement>;
    onPreSubmit: (close: boolean) => void;
}

export const AddMovieForm: React.FC<Props> = ({
    inputNames,
    inputState,
    isLoading,
    onChange,
    onSubmit,
    onPreSubmit
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
        onChange(formElement.current);
    }

    return (
        <form onSubmit={onSubmit} ref={formElement}>
            <fieldset className={styles.addMovieFieldset}>
                <legend>Create movie card</legend>
                <div className={styles.columnCtr}>
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
                <div className={styles.rowCtr}>    
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
                <div className={styles.columnCtr}>
                    <label htmlFor={inputNames.genre}>Genre</label>
                    <select name={inputNames.genre}
                        required
                        id={inputNames.genre}
                        value={inputState.genre}
                        onChange={_ => handleInputChange()}>
                        {constructOptionElements()}
                    </select>
                </div>
                <div className={styles.columnCtr}>
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
                <div className={`${styles.loader} ${!isLoading && styles.loaderHidden}`}></div>
                <button className={styles.submitButton}
                    type="submit"
                    disabled={isLoading}
                    onMouseDown={_ => onPreSubmit(false)}>
                    Create Card
                </button>
                <button className={styles.submitButton}
                    type="submit"
                    disabled={isLoading}
                    onMouseDown={_ => onPreSubmit(true)}>
                    Create Card And Close Form
                </button>
            </fieldset>
        </form>
    );
}
