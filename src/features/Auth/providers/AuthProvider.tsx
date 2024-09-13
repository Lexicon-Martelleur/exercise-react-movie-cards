import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { IAuthContext } from "../types";
import { TOKEN_KEY } from "../constants";
import { AuthContext } from "../context";
import { useAuthQuery } from "../hooks";
import { isUserAuth, ITokenContainer } from "../../../model";

interface Props {
    children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({
	children
}): ReactElement => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const authAPIHook = useAuthQuery();
    const [
		tokens,
		setTokens,
		clearTokens
	] = useLocalStorage<ITokenContainer | null>(TOKEN_KEY, null);
  
    useEffect(() => {
		if (tokens == null) { setIsLoggedIn(false); }
		else { setIsLoggedIn(true); }
    }, [tokens]);

	const login = async (userName: string, password: string) => {
		const userAuth = { userName, password };
		if (!isUserAuth(userAuth)) { return; }
		const tokens = await authAPIHook.login(userAuth);
		setTokens(tokens);
	};
	
	const logout = () => {
		clearTokens();
	};

	const updateTokens = (tokens: ITokenContainer | null) => {
		setTokens(tokens);
	};

	const getAuthContextValues = (): IAuthContext => {
		return {
			isLoggedIn,
			tokens,
			updateTokens,
			login,
			logout
		};
	};
  
    return (
		<AuthContext.Provider 
			value={getAuthContextValues()}>
			{children}
		</AuthContext.Provider>
	);
};
  