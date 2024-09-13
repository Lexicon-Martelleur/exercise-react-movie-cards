import { FormEventHandler, ReactElement, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../context";
import { Input } from "../../../../components";
import styles from "./LoginForm.module.css";

export const LoginForm = (): ReactElement => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const { isLoggedIn, login } = useAuthContext();
	const navigate = useNavigate();

	if (isLoggedIn) {
		return <Navigate to="/" replace />;
	}

	const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		await login(username, password);
		navigate("/");
	};

	return (
		<form className={styles.loginForm}
			onSubmit={handleOnSubmit}>
			<fieldset className={styles.loginFieldset}>
				<legend>Login</legend>
				<Input id="username" 
					value={username}
					onChange={event => setUsername(event.target.value)}/>
				<Input id="password" 
					value={password}
					onChange={event => setPassword(event.target.value)}/>
				<button type="submit"
					className={styles.submitButton}>Submit</button>
			</fieldset>
		</form>
	);
};
