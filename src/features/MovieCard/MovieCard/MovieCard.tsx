import { ReactElement } from "react";

import { MovieCardProvider } from "../providers";
import { MovieListSection, AddMovieSection } from "../components";

import { MovieCardLayout } from "../layouts";

export const MovieCard = (): ReactElement => {
    return (
        <MovieCardLayout>
            <MovieCardProvider>
                <AddMovieSection />
            </MovieCardProvider>
            <MovieListSection />
        </MovieCardLayout>
    );
}
