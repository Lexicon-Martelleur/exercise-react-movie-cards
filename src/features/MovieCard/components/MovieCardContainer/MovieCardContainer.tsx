import { ReactElement } from "react";

import { MovieCardProvider } from "../../providers";
import { MovieList } from "../MovieList";
import { AddMovie } from "../AddMovie";

export const MovieCardContainer = (): ReactElement => {
    return (
        <>
            <MovieCardProvider>
                <AddMovie></AddMovie>
                <MovieList></MovieList>
            </MovieCardProvider>   
        </>
    );
}
