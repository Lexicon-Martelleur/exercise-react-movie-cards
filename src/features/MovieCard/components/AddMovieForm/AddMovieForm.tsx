import { FormEventHandler, ReactElement, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';

import * as Constant from "../../../../constants";
import { IMovieCard } from "../../../../model";
import { StarRating } from "../StarRating";
import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import { movieFormInputNames } from "../constants";

import styles from "./AddMovieForm.module.css";


interface Props {
	formInputState: IMovieCard;
	isLoading: boolean;
	submitResult: string | null;
	onClear: () => void;
	onChange: (formElement: HTMLFormElement | null) => void;
	onSubmit: FormEventHandler<HTMLFormElement>;
	onPreSubmit: (close: boolean) => void;
}

export const AddMovieForm: React.FC<Props> = ({
	formInputState,
	isLoading,
	submitResult,
	onClear,
	onChange,
	onSubmit,
	onPreSubmit
}): ReactElement => {
	const ratingInput = useRef<HTMLInputElement | null>(null);
	const form = useRef<HTMLFormElement | null>(null);
	const initRating = formInputState.rating;
	const [rating, setRating] = useState(initRating);

	const updateRating = (value: number) => {
		if (ratingInput.current == null) { return; }
		setRating(value);
		ratingInput.current.value = `${value}`;
		onChange(form.current);
	}

	const handleClear = () => {
		setRating(Constant.minRating);
		onClear();
	}

	return (
		<form onSubmit={onSubmit} ref={form}>
			<fieldset className={styles.addMovieFieldset}>
				<legend>Create movie card</legend>
				<div className={styles.rowCtrCenter}>
					<button className={styles.clearButton}
						onClick={_ => handleClear()}
						disabled={isLoading}
						data-testid="clear-button">
						Clear all fields
						<Icon icon={icons.backspace}/>
					</button>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.title}>Title</label>
					<input type="text"
						required
						autoFocus
						minLength={Constant.minLengthTitle}
						maxLength={Constant.maxLengthTitle}
						name={movieFormInputNames.title}
						id={movieFormInputNames.title}
						value={formInputState.title}
						onChange={_ => onChange(form.current)}
						data-testid={movieFormInputNames.title} />
				</div>
				<div className={styles.rowCtr}>    
					<label htmlFor={movieFormInputNames.rating}>Rating</label>
					<StarRating
						rating={rating} updateRating={updateRating}
						data-testid="star-rating"/>
					<input type="range"
						required
						hidden
						ref={ratingInput}
						value={formInputState.rating}
						min={Constant.minRating}
						max={Constant.maxRating}
						name={movieFormInputNames.rating}
						id={movieFormInputNames.rating}
						onChange={_ => onChange(form.current)}
						data-testid={movieFormInputNames.rating} />
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.genre}>Genre</label>
					<select name={movieFormInputNames.genre}
						required
						id={movieFormInputNames.genre}
						value={formInputState.genre}
						onChange={_ => onChange(form.current)}
						data-testid={movieFormInputNames.genre} >
						{Object.values(Constant.movieGenre).map(value => (
						<option 
							key={uuid()}
							value={value.toLowerCase()}>
							{value}
						</option>
						))}
					</select>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.description}>Description</label>
					<textarea rows={5}
						required
						minLength={Constant.minLengthDescription}
						maxLength={Constant.maxLengthDescription}
						name={movieFormInputNames.description}
						id={movieFormInputNames.description}
						value={formInputState.description}
						onChange={_ => onChange(form.current)}
						data-testid={movieFormInputNames.description} />
				</div>
				<div className={`${styles.formStatusCtr}`}>
					{isLoading && <div className={`${styles.loader}`}></div>}
					{submitResult != null && !isLoading && <p className={styles.submitResult}
						data-testid="submit-result">
						{submitResult}
					</p>}	
				</div>
				<button className={styles.submitButton}
					type="submit"
					disabled={isLoading}
					onMouseDown={_ => onPreSubmit(false)} 
					data-testid="submit-btn">
					Create Card
				</button>
				<button className={styles.submitButton}
					type="submit"
					disabled={isLoading}
					onMouseDown={_ => onPreSubmit(true)} 
					data-testid="submit-btn-with-close">
					Create Card And Close Form
				</button>
			</fieldset>
		</form>
	);
}
