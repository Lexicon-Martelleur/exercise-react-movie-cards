import { createContext, useContext } from "react";

import { IAuthContext } from "../types";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthContext = () => {
    const contextValue = useContext(AuthContext);
    if (contextValue == null) {
        throw new Error("useAuthContext must be used within a Provider");
    }
    return contextValue;
};
