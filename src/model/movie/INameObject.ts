export interface INameObject {
    name: string;
    id: string;
}

export function isNameObject (obj: unknown): obj is INameObject {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as INameObject;
    return (
        typeof castObj.name === "string" &&
        typeof castObj.id ===  "string"
    );
}
