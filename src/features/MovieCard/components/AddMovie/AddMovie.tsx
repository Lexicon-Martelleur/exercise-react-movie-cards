import { FormEventHandler, ReactElement, useState } from "react";

import { maxRating, minRating, movieGenre } from "../../../../service";
import { Icon } from "../../../../components/Icon"
import { icons } from "../../../../assets";
import styles from "./AddMovie.module.css";

/**
 * @TODO Implement and clean up
 */
export const AddMovie = (): ReactElement => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleOnSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
    }

    const constructOptionElements = () => {
        return Object.entries(movieGenre).map(entry => {
            return <option key={entry[0]} value={entry[0]}>{entry[1]}</option>;
        });
    }

    const openForm = () => {
        setIsFormOpen(true);
    }

    const closeForm = () => {
        setIsFormOpen(false);
    }

    return (
        <section className={styles.addMovieSection}>
            <div className={styles.addMovieTitleCtr}>
                <h2>Add Movie Card</h2>
                {!isFormOpen 
                ?
                <div onClick={openForm}>
                    <Icon
                        className={styles.openFormButton}
                        size={"medium"}
                        icon={icons.expandContent}>
                    </Icon>
                </div>
                :
                <div onClick={closeForm}>
                    <Icon
                        className={styles.openFormButton}
                        size={"medium"}
                        icon={icons.collapseContent}>
                    </Icon>
                </div>}
            </div>
            {isFormOpen && <form onSubmit={handleOnSubmit}>
                <fieldset className={styles.addMovieFieldset}>
                    <legend>Create new movie card</legend>
                    <div>
                        <label htmlFor="title">Title</label>
                        <input type="text"
                            name="title"
                            id="title" />
                    </div>
                    <div>    
                        <label htmlFor="rating">Rating</label>
                        <input type="range"
                            min={minRating}
                            max={maxRating}
                            name="rating"
                            id="rating" />
                    </div>
                    <div>
                        <label htmlFor="genre">Genre</label>
                        <select name="genre" id="genre">
                        {constructOptionElements()}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea rows={5} name="description" id="description" />
                    </div>
                    <button type="submit">Create Movie Card</button>
                </fieldset>
            </form>}
        </section>
    );
}