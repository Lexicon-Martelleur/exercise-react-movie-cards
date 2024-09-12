import { ITokenContainer } from "../../../model";

export interface IAuthContext {
    isLoggedIn: boolean;
    tokens: ITokenContainer | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

