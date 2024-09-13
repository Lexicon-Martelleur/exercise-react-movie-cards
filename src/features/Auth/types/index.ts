import { ITokenContainer } from "../../../model";

export interface IAuthContext {
    isLoggedIn: boolean;
    tokens: ITokenContainer | null;
    updateTokens: (toks: ITokenContainer | null) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

