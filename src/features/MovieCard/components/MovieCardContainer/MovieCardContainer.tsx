import { ReactElement } from "react";

import { MovieCardProvider } from "../../providers";
import { MovieList } from "../MovieList"

export const MovieCardContainer = (): ReactElement => {
    return (
        <>
            <MovieCardProvider>
                <MovieList></MovieList>
            </MovieCardProvider>   
        </>
    );
}
