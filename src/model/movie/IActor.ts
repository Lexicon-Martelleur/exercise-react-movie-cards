import { INameObject, isNameObject } from "./INameObject";

export interface IActor extends INameObject {
    dateOfBirth: number;
}

export function isActor (obj: unknown): obj is IActor {
    if (obj == null || typeof obj !== "object" || !isNameObject(obj)) {
        return false;
    }

    const castObj = obj as IActor;
    return (
        typeof castObj.dateOfBirth === "number"
    );
}
