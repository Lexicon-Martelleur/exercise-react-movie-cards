export interface IUserAuth {
    userName: string;
    password: string;
}

export function isUserAuth (obj: unknown): obj is IUserAuth {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as IUserAuth;
    return (
        typeof castObj.userName === "string" &&
        typeof castObj.password === "string"
    );
}
