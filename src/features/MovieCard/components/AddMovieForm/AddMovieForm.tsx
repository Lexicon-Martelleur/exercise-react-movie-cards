import React, { ReactElement, useRef, useState } from "react";

import * as Constant from "../../../../constants";
import * as Model from "../../../../model";
import { StarRating } from "../StarRating";
import { icons } from "../../../../assets";
import { HiddenInput, Icon, Input, Loader, SelectMenu } from "../../../../components";
import { movieFormInputNames } from "../constants";

import { useAddMovieForm } from "./useAddMovieForm";
import styles from "./AddMovieForm.module.css";

/**
 * @TODO Clean up.
 */

interface Props {
	newMovieCard: Model.INewMovieCard;
	selectableActors: Model.IActor[];
	selectableDirectors: Model.IDirector[];
	selectableGenres: Model.IGenre[];
}

const selectMenuTitles = {
	actors: "Actors",
	directors: "Directors",
	genres: "Genres",
	none: ""
} as const

type SelectMenuTitleType = typeof selectMenuTitles[
	keyof typeof selectMenuTitles
]

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
	const [
		currentSelectMenu,
		setCurrentSelectMenu
	] = useState<SelectMenuTitleType>("");

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

	const handleOpenSelectMenu = (title: string) => {
		if (Object.values(selectMenuTitles).includes(title as SelectMenuTitleType)) {
			const selectTitle = title as SelectMenuTitleType;
			setCurrentSelectMenu(selectTitle);
		}
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
				<Input title={movieFormInputNames.title}
					value={newMovieCard.title}
					minLength={Constant.minLengthTitle}
					maxLength={Constant.maxLengthTitle}
					onChange={() => { addMovieFormHook.handleChange(form.current) }} />
				<HiddenInput ref={ratingInput}
					title={movieFormInputNames.rating}
					value={`${newMovieCard.rating}`}
					minLength={Constant.minRating}
					maxLength={Constant.maxRating}>
					<StarRating
						rating={newMovieCard.rating} updateRating={updateSelectedRating}
						data-testid="star-rating"/>
				</HiddenInput>
				<HiddenInput ref={directorInput}
					title={movieFormInputNames.director}
					value={newMovieCard.director}>
					<SelectMenu
						open={currentSelectMenu === selectMenuTitles.directors}
						options={new Set(selectableDirectors)}
						selectedOptionIds={new Set([newMovieCard.director])}
						title={selectMenuTitles.directors}
						onOpenMenu={handleOpenSelectMenu}
						onSelectOption={updateSelectedDirector}/>
				</HiddenInput>
				<HiddenInput ref={actorsInput}
					title={movieFormInputNames.actors}
					value={newMovieCard.actors.join(",")}>
					<SelectMenu
						open={currentSelectMenu === selectMenuTitles.actors}
						options={new Set(selectableActors)}
						selectedOptionIds={new Set(newMovieCard.actors)} 
						title={selectMenuTitles.actors}
						onOpenMenu={handleOpenSelectMenu}
						onSelectOption={updateSelectedActors}/>
				</HiddenInput>
				<HiddenInput ref={genresInput}
					title={movieFormInputNames.genres}
					value={newMovieCard.genres.join(",")}>
					<SelectMenu
						open={currentSelectMenu === selectMenuTitles.genres}
						options={new Set(selectableGenres)}
						selectedOptionIds={new Set(newMovieCard.genres)} 
						title={selectMenuTitles.genres}
						onOpenMenu={handleOpenSelectMenu}
						onSelectOption={updateSelectedGenres}/>
				</HiddenInput>
				<Input textArea={true} 
					title={movieFormInputNames.description}
					value={newMovieCard.description}
					minLength={Constant.minLengthDescription}
					maxLength={Constant.maxLengthDescription}
					onChange={() => { addMovieFormHook.handleChange(form.current) }} />
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
