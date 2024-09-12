export interface ITokenContainer {
    accessToken: string;
    refreshToken: string;
}

export function isTokenContainer (obj: unknown): obj is ITokenContainer {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as ITokenContainer;
    return (
        typeof castObj.accessToken === "string" &&
        typeof castObj.refreshToken === "string"
    );
}
