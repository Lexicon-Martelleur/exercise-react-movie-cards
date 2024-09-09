export interface GenreDTO {
    id: number
    nameAsString: string
    nameAsNumber: number
}

export function isGenreDTO (obj: unknown): obj is GenreDTO {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as GenreDTO;
    return (
        typeof castObj.id === "number" &&
        typeof castObj.nameAsString === "string" &&
        typeof castObj.nameAsNumber === "number"
    );
}
