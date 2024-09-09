export interface ActorDTO {
    id: number;
    name: string;
    dateOfBirth: number;
}

export function isActorDTO (obj: unknown): obj is ActorDTO {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as ActorDTO;
    return (
        typeof castObj.id === "number" &&
        typeof castObj.name === "string" &&
        typeof castObj.dateOfBirth === "number"
    );
}
