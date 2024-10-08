import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../context";

interface Props {
  children: ReactElement;
}

export const AuthGuard: React.FC<Props> = ({
	children
}): ReactElement => {
	const { isLoggedIn } = useAuthContext();

	if (isLoggedIn === false) {
		return <Navigate to="/login" />;
	}

	return (
		<>
			{children}
		</>
	);
};
