import { ReactElement, useContext } from "react";

import { MovieCardContext } from "../../context/movieCardContext";
import { MovieCard } from "../MovieCard";
import styles from "./MovieList.module.css";

/**
 * @TODO implement delete / use movie card 
 */
export const MovieList = (): ReactElement => {
    const [_, movieCardState] = useContext(MovieCardContext);
    
    return (
        <section className={styles.movielistSection}>
            <h2 className={styles.movielistTitle}>Available Movie Cards</h2>
            {movieCardState.movieCards.map(movieCardEnity =>
                <MovieCard 
                    key={movieCardEnity.id}
                    movieCard={movieCardEnity.moviecard} />
            )}
        </section>
    );
}
