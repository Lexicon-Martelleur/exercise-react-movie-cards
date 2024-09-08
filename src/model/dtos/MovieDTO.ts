export interface MovieDTO {
    id: number;
    title: string;
    rating: number;
    timeStamp: number;
    description: string;
}

export function isMovieDTO (obj: unknown): obj is MovieDTO {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const todoObj = obj as MovieDTO;
    return (
        typeof todoObj.id === "number" &&
        typeof todoObj.title ===  "string" &&
        typeof todoObj.rating === "number" &&
        typeof todoObj.timeStamp === "number" &&
        typeof todoObj.description === "string"
    );
}
