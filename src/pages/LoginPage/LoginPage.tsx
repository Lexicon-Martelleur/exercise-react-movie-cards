import React, { ReactElement } from "react";

import { LoginForm } from "../../features";
import styles from "./LoginPage.module.css";

export const LoginPage = (): ReactElement => {
    return (
        <main id="login-page" 
            className={styles.main}>
            <LoginForm />
        </main>
    );
};
