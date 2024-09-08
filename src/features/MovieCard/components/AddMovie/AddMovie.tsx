import { ReactElement } from "react";

import { FormExpander } from "../FormExpander";
import { AddMovieForm } from "../AddMovieForm";
import { useAddMovie } from "./useAddMovie";
import styles from "./AddMovie.module.css";

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
 * Also Create react compnents for INput/TextArea etc
 */
export const AddMovie = (): ReactElement => {
    const hook = useAddMovie();

    return (
        <section className={styles.addMovieSection}>
            <FormExpander title={"Movie Card Form"}
                isFormOpen={hook.isFormOpen}
                toggleForm={hook.toggleForm}/>
            {hook.isFormOpen || !hook.isFormOpen && <AddMovieForm />}
        </section>
    );
}
