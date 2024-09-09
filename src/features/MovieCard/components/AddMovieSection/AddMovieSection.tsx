import { ReactElement } from "react";

import { FormExpander } from "../FormExpander";
import { AddMovieForm } from "../AddMovieForm";

import { useAddMovieSection } from "./useAddMovieSection";
import styles from "./AddMovieSection.module.css";
import { useMovieCardContext } from "../../context";

export const AddMovieSection = (): ReactElement => {
    const addMovieSectionHook = useAddMovieSection();
    const [_, movieState] = useMovieCardContext();

    return (
        <section className={styles.addMovieSection}>
            <FormExpander title={"Movie Card Form"}
                isFormOpen={addMovieSectionHook.isFormOpen}
                toggleForm={addMovieSectionHook.toggleForm}/>
            {addMovieSectionHook.isFormOpen && <AddMovieForm 
                newMovieCard={movieState.newMovieCard}
                selectableActors={movieState.selectableActors}
                selectableDirectors={movieState.selectableDirectors}
                selectableGenres={movieState.selectableGenres}/>}
        </section>
    );
}
