import { ReactElement } from "react";

import { MovieCardProvider } from "../providers";
import { MovieList, AddMovie } from "../components";
import { MovieCardLayout } from "../layouts";

export const MovieCard = (): ReactElement => {
    return (
        <MovieCardProvider>
            <MovieCardLayout>
                <AddMovie />
                <MovieList />
            </MovieCardLayout>
        </MovieCardProvider>
    );
}
