import { INameObject, isNameObject } from "./INameObject";

export interface IDirector extends INameObject {
    dateOfBirth: number;
}

export function isActor (obj: unknown): obj is IDirector{
    if (obj == null || typeof obj !== "object" || !isNameObject(obj)) {
        return false;
    }

    const castObj = obj as IDirector;
    return (
        typeof castObj.dateOfBirth === "number"
    );
}
