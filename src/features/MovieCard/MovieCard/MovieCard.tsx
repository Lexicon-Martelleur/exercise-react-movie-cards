import { ReactElement } from "react";

import { MovieCardProvider } from "../providers";
import { MovieList, AddMovieSection } from "../components";
import { MovieCardLayout } from "../layouts";

export const MovieCard = (): ReactElement => {
    return (
        <MovieCardProvider>
            <MovieCardLayout>
                <AddMovieSection />
                <MovieList />
            </MovieCardLayout>
        </MovieCardProvider>
    );
}
