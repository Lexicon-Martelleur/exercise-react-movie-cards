import { ReactElement, useEffect, useRef, useState } from "react";

import * as Constant from "../../../../constants";
import { INameObject } from "../../../../model";
import { StarRating } from "../StarRating";
import { icons } from "../../../../assets";
import { Icon, SelectMenu } from "../../../../components";
import { movieFormInputNames } from "../constants";
import { movieGenre } from "../../../../constants";
import { useMovieCardContext } from "../../context";

import { useAddMovieForm } from "./useAddMovieForm";
import styles from "./AddMovieForm.module.css";
/**
 * @TODO 
 * 
 * Create MovieDetail type and add to movie state
 * that should reflect creating a MovieCard DTO
 * and requesting a MovieCard Detail DTO from API.
 * 
 * See backend API; User need to select available
 * genres, actors and a unique director. 
 * 
 * Also Create react compnents for INput/TextArea etc.
 */

export const AddMovieForm = (): ReactElement => {
	const [_, movieState] = useMovieCardContext();
	const addMovieFormHook = useAddMovieForm();
	const ratingInput = useRef<HTMLInputElement | null>(null);
	const directorInput = useRef<HTMLInputElement | null>(null);
	const actorsInput = useRef<HTMLInputElement | null>(null);
	const genresInput = useRef<HTMLInputElement | null>(null);
	const form = useRef<HTMLFormElement | null>(null);
	const initRating = movieState.newMovieCard.rating;
	const [rating, setRating] = useState(initRating);
	const [actorIds, setActorIds] = useState("");
	const [directorId, setDirectorId] = useState("");
	const [genres, setGenres] = useState(`${movieGenre.unknown}`);

	useEffect(() => {
		console.log("rendering")
	})

	const updateSelectedRating = (value: number) => {
		if (ratingInput.current == null) { return; }
		setRating(value);
		ratingInput.current.value = `${value}`;
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedActors = (value: string) => {
		if (actorsInput.current == null) { return; }
		setActorIds(pre => `${pre},${value}`);
		actorsInput.current.value = value;
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedDirector = (value: string) => {
		if (directorInput.current == null) { return; }
		setDirectorId(value);
		directorInput.current.value = `${value}`;
		addMovieFormHook.handleChange(form.current);
	}

	const updateSelectedGenres = (value: string) => {
		if (genresInput.current == null) { return; }
		setGenres(pre => `${pre},${value}`);
		genresInput.current.value = `${value}`;
		addMovieFormHook.handleChange(form.current);
	}

	const handleClear = () => {
		setRating(Constant.minRating);
		addMovieFormHook.handleClearForm();
	}

	const mapGenresToNamedGenresType = (): INameObject[] => {
		return [...Object.values(Constant.movieGenre)].map(item => ({
			name: item,
			id: item
		}))
	}

	return (
		<form onSubmit={addMovieFormHook.handleSubmit} ref={form}>
			<fieldset className={styles.addMovieFieldset}>
				<legend>Create movie card</legend>
				<div className={styles.rowCtrCenter}>
					<button className={styles.clearButton}
						onClick={_ => handleClear()}
						disabled={addMovieFormHook.isLoading}
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
						value={movieState.newMovieCard.title}
						onChange={_ => addMovieFormHook.handleChange(form.current)}
						data-testid={movieFormInputNames.title} />
				</div>
				<div className={styles.rowCtr}>    
					<label htmlFor={movieFormInputNames.rating}>Rating</label>
					<StarRating
						rating={rating} updateRating={updateSelectedRating}
						data-testid="star-rating"/>
					<input type="range"
						required
						hidden
						ref={ratingInput}
						value={rating}
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
						value={directorId}
						name={movieFormInputNames.director}
						id={movieFormInputNames.director}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(movieState.selectableDirectors)}
						selectedOptionIds={new Set([directorId])}
						title="Directors"
						onSelect={updateSelectedDirector}/>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.actors}>Select Actors</label>
					<input ref={actorsInput}
						required
						hidden
						value={actorIds}
						name={movieFormInputNames.actors}
						id={movieFormInputNames.actors}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(movieState.selectableDirectors)}
						selectedOptionIds={new Set(actorIds.split(","))} 
						title="Select Actors"
						onSelect={updateSelectedActors}/>
				</div>
				<div className={styles.columnCtr}>
					<label htmlFor={movieFormInputNames.genres}>Select Genres</label>
					<input ref={genresInput}
						required
						hidden
						value={genres}
						name={movieFormInputNames.genres}
						id={movieFormInputNames.genres}
						onChange={_ => addMovieFormHook.handleChange(form.current)} />
					<SelectMenu
						options={new Set(mapGenresToNamedGenresType())}
						selectedOptionIds={new Set()} 
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
						value={movieState.newMovieCard.description}
						onChange={_ => addMovieFormHook.handleChange(form.current)}
						data-testid={movieFormInputNames.description} />
				</div>
				<div className={`${styles.formStatusCtr}`}>
					{addMovieFormHook.isLoading && <div className={`${styles.loader}`}></div>}
					{addMovieFormHook.submitResult != null &&
					!addMovieFormHook.isLoading &&
					<p className={styles.submitResult}
						data-testid="submit-result">
						{addMovieFormHook.submitResult}
					</p>}	
				</div>
				<button className={styles.submitButton}
					type="submit"
					disabled={addMovieFormHook.isLoading}
					onMouseDown={_ => addMovieFormHook.handlePreSubmit(false)} 
					data-testid="submit-btn">
					Create Card
				</button>
				<button className={styles.submitButton}
					type="submit"
					disabled={addMovieFormHook.isLoading}
					onMouseDown={_ => addMovieFormHook.handlePreSubmit(true)} 
					data-testid="submit-btn-with-close">
					Create Card And Close Form
				</button>
			</fieldset>
		</form>
	);
}
