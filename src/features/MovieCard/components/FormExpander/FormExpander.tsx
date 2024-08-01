import React, { ReactElement } from "react";

import { Icon } from "../../../../components";
import { icons } from "../../../../assets";
import styles from "./FormExpander.module.css";

interface Props {
    title: string
    isFormOpen: boolean;
    toggleForm: () => void;
}

export const FormExpander: React.FC<Props> = ({
    title,
    isFormOpen,
    toggleForm
}): ReactElement => {
    return (
        <div className={styles.formExpander}>
            <h2 className={styles.formExpanderTitle}>{title}</h2>
            {!isFormOpen
            ?
            <div onClick={toggleForm}>
                <Icon
                    className={styles.openFormButton}
                    size={"medium"}
                    icon={icons.expandContent}>
                </Icon>
            </div>
            :
            <div onClick={toggleForm}>
                <Icon
                    className={styles.openFormButton}
                    size={"medium"}
                    icon={icons.collapseContent}>
                </Icon>
            </div>}
        </div>
    );
}