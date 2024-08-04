import { ReactElement } from "react";

import { FormExpander } from "../FormExpander";
import { AddMovieForm } from "../AddMovieForm";
import { useAddMovie } from "./useAddMovie";
import styles from "./AddMovie.module.css";

export const AddMovie = (): ReactElement => {
    const hook = useAddMovie();

    return (
        <section className={styles.addMovieSection}>
            <FormExpander title={"Movie Card Form"}
                isFormOpen={hook.isFormOpen}
                toggleForm={hook.toggleForm}/>
            {hook.isFormOpen && <AddMovieForm
                formInputState={hook.movieCardState.newMovieCard}
                isLoading={hook.isLoading}
                submitResult={hook.submitResult}
                onClear={hook.handleClearForm}
                onChange={hook.handleChange}
                onSubmit={hook.handleSubmit}
                onPreSubmit={hook.handlePreSubmit}/>}
        </section>
    );
}
