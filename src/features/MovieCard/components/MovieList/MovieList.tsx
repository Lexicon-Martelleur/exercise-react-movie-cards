import { ReactElement, useContext } from "react";

import { MovieCardContext } from "../../context/movieCardContext";
import { MovieCard } from "../MovieCard";
import styles from "./MovieList.module.css";

export const MovieList = (): ReactElement => {
    const [_, movieCardState] = useContext(MovieCardContext);
    
    return (
        <section className={styles.movielistSection}>
            {movieCardState.movieCards.map(movieCardEnity =>
                <MovieCard 
                    key={movieCardEnity.id}
                    movieCard={movieCardEnity.moviecard} />
            )}
        </section>
    )
}
