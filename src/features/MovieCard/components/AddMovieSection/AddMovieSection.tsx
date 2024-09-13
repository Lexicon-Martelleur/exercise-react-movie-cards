import { ReactElement } from "react";

import { FormExpander } from "../FormExpander";
import { AddMovieForm } from "../AddMovieForm";
import { useMovieCardContext } from "../../context";
import { selectTitle, updateCreatedMovieCardAction } from "../../state";
import { InfoToast } from "../../../../components";

import { useAddMovieSection } from "./useAddMovieSection";
import styles from "./AddMovieSection.module.css";

export const AddMovieSection = (): ReactElement => {
    const addMovieSectionHook = useAddMovieSection();
    const [dispatchMovieAction, movieState] = useMovieCardContext();

    return (
        <section className={styles.addMovieSection}>
            <FormExpander title={"Movie Card Form"}
                isFormOpen={addMovieSectionHook.isFormOpen}
                toggleForm={addMovieSectionHook.toggleForm}/>
            {addMovieSectionHook.isFormOpen && <AddMovieForm 
                newMovieCard={movieState.newMovieCard}
                selectableActors={movieState.selectableActors}
                selectableDirectors={movieState.selectableDirectors}
                selectableGenres={movieState.selectableGenres}
                updateFormOpen={addMovieSectionHook.updateFormOpen}/>}
            {movieState.createdMovieCard != null && <InfoToast 
                message={`${selectTitle(movieState.createdMovieCard)} have been created`}
                close={() => { dispatchMovieAction(updateCreatedMovieCardAction(null)); }}/>}
        </section>
    );
};
