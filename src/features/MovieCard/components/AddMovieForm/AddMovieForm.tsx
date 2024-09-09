import React, { ReactElement, useRef } from "react";

import * as Constant from "../../../../constants";
import * as Model from "../../../../model";
import { StarRating } from "../StarRating";
import { icons } from "../../../../assets";
import { Icon, Loader, SelectMenu } from "../../../../components";
import { movieFormInputNames } from "../constants";

import { useAddMovieForm } from "./useAddMovieForm";
import styles from "./AddMovieForm.module.css";

interface Props {
	newMovieCard: Model.INewMovieCard;
	selectableActors: Model.IActor[];
	selectableDirectors: Model.IDirector[];
	selectableGenres: Model.IGenre[];
}

/**
 * @TODO Clean up.
 */
export const AddMovieForm: React.FC<Props> = ({
	newMovieCard,
	selectableActors,
	selectableDirectors,
	selectableGenres
}): ReactElement => {
	const addMovieFormHook = useAddMovieForm();
	const ratingInput = useRef<HTMLInputElement | null>(null);
	const directorInput = useRef<HTMLInputElement | null>(null);
	const actorsInput = useRef<HTMLInputElement | null>(null);
	const genresInput = useRef<HTMLInputElement | null>(null);
	const form = useRef<HTMLFormElement | null>(null);

	const updateSelectedRating = (value: number) => {
		if (ratingInput.current == null) { return; }
		ratingInput.current.value = `${value}`;
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedActors = (value: string) => {
		if (actorsInput.current == null) { return; }
		const updatedList = newMovieCard.actors.find(item => item === value) == null
			? newMovieCard.actors = [...newMovieCard.actors, value]
			: newMovieCard.actors.filter(item => item !== value);
		actorsInput.current.value = updatedList.join(",");
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedDirector = (value: string) => {
		if (directorInput.current == null) { return; }
		directorInput.current.value = `${value}`;
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedGenres = (value: string) => {
		if (genresInput.current == null) { return; }
		const updatedList = newMovieCard.genres.find(item => item === value) == null
			? newMovieCard.genres = [...newMovieCard.genres, value]
			: newMovieCard.genres.filter(item => item !== value);
		genresInput.current.value = updatedList.join(",");
		addMovieFormHook.handleChange(form.current);
	}

	const handleClear = () => {
		addMovieFormHook.handleClearForm();
	}

	return (
		<form ref={form}
			className={styles.addMovieForm}
			onSubmit={addMovieFormHook.handleSubmit}>
			<fieldset className={styles.addMovieFieldset}>
				<legend>Create movie card</legend>
				<div className={styles.rowCtrCenter}>
					{addMovieFormHook.isPending
						? <Loader /> 
						: <button type="button" 
							className={styles.clearButton}
							onClick={_ => handleClear()}
							disabled={addMovieFormHook.isPending}
							data-testid="clear-button">
							Clear all fields
							<Icon icon={icons.backspace}/>
						</button>
					}
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.title}>Title</label>
					<input type="text"
						required
						autoFocus
						minLength={Constant.minLengthTitle}
						maxLength={Constant.maxLengthTitle}
						name={newMovieCard.title}
						id={movieFormInputNames.title}
						value={newMovieCard.title}
						onChange={_ => addMovieFormHook.handleChange(form.current)}
						data-testid={movieFormInputNames.title} />
				</div>
				<div className={styles.rowCtr}>    
					<label htmlFor={movieFormInputNames.rating}>Rating</label>
					<StarRating
						rating={newMovieCard.rating} updateRating={updateSelectedRating}
						data-testid="star-rating"/>
					<input type="range"
						required
						hidden
						ref={ratingInput}
						value={newMovieCard.rating}
						min={Constant.minRating}
						max={Constant.maxRating}
						name={movieFormInputNames.rating}
						id={movieFormInputNames.rating}
						onChange={_ => addMovieFormHook.handleChange(form.current)}
						data-testid={movieFormInputNames.rating} />
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.director}>Select Director</label>
					<input ref={directorInput}
						required
						hidden
						value={newMovieCard.director}
						name={movieFormInputNames.director}
						id={movieFormInputNames.director}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(selectableDirectors)}
						selectedOptionIds={new Set([newMovieCard.director])}
						title="Directors"
						onSelect={updateSelectedDirector}/>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.actors}>Select Actors</label>
					<input ref={actorsInput}
						required
						hidden
						value={newMovieCard.actors.join(",")}
						name={movieFormInputNames.actors}
						id={movieFormInputNames.actors}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(selectableActors)}
						selectedOptionIds={new Set(newMovieCard.actors)} 
						title="Select Actors"
						onSelect={updateSelectedActors}/>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.genres}>Select Genres</label>
					<input ref={genresInput}
						required
						hidden
						value={newMovieCard.genres.join(",")}
						name={movieFormInputNames.genres}
						id={movieFormInputNames.genres}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(selectableGenres)}
						selectedOptionIds={new Set(newMovieCard.genres)} 
						title="Genres"
						onSelect={updateSelectedGenres}/>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.description}>Description</label>
					<textarea rows={5}
						required
						minLength={Constant.minLengthDescription}
						maxLength={Constant.maxLengthDescription}
						name={movieFormInputNames.description}
						id={movieFormInputNames.description}
						value={newMovieCard.description}
						onChange={_ => addMovieFormHook.handleChange(form.current)}
						data-testid={movieFormInputNames.description} />
				</div>
				<div className={`${styles.formStatusCtr}`}>
					{addMovieFormHook.isPending && <Loader />}
				</div>
				<button className={styles.submitButton}
					type="submit"
					disabled={addMovieFormHook.isPending}
					onMouseDown={_ => addMovieFormHook.handlePreSubmit(false)} 
					data-testid="submit-btn">
					Create Card
				</button>
				<button className={styles.submitButton}
					type="submit"
					disabled={addMovieFormHook.isPending}
					onMouseDown={_ => addMovieFormHook.handlePreSubmit(true)} 
					data-testid="submit-btn-with-close">
					Create Card And Close Form
				</button>
			</fieldset>
		</form>
	);
}
