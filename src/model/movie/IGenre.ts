import { INameObject, isNameObject } from "./INameObject";

export interface IGenre extends INameObject {
    id: string
    name: string
    nameAsNumber: number
}

export function isGenre (obj: unknown): obj is IGenre {
    if (obj == null || typeof obj !== "object" || !isNameObject(obj)) {
        return false;
    }

    const castObj = obj as IGenre;
    return (
        typeof castObj.nameAsNumber === "number"
    );
}
