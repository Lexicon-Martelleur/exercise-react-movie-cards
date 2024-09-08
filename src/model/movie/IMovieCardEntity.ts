import { IMovieCard, isMovieCard } from "./IMovieCard";

export type IMovieCardEntity = Readonly<{
    id: string;
    moviecard: IMovieCard;
}>

export function isMovieCardEntity (obj: unknown): obj is IMovieCardEntity {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const entityObj = obj as IMovieCardEntity;
    return (
        typeof entityObj.id === "string" &&
        isMovieCard(entityObj.moviecard) 
    );
}
