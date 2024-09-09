export interface DirectorDTO {
    id: number;
    name: string;
    dateOfBirth: number;
}

export function isDirectorDTO (obj: unknown): obj is DirectorDTO {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as DirectorDTO;
    return (
        typeof castObj.id === "number" &&
        typeof castObj.name === "string" &&
        typeof castObj.dateOfBirth === "number"
    );
}
