import { movieGenre } from "../../constants";

export type MovieGenreType = typeof movieGenre[
    keyof typeof movieGenre
];

export function isValidGenre (genre: string): genre is MovieGenreType {
    return (
        typeof genre === "string" &&
        Object.values(movieGenre).includes(genre as MovieGenreType)
    );
}
