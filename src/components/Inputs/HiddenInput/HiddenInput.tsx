import { forwardRef, ReactElement, ReactNode } from "react";

import styles from "./HiddenInput.module.css";

interface Props {
    id: string;
    value: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
    orientation?: "row" | "column";
    children: ReactNode;
}

export const HiddenInput = forwardRef<HTMLInputElement | null, Props>(({
    id,
    title,
    value,
    minLength,
    maxLength,
    orientation,
    children}, ref
): ReactElement => {        
    const getLowerCaseTitle = (title: string) => {
        return title.toLowerCase();
    };

    const getPascalCase = (title: string) => {
        return title
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const constructContainerStyle = () => {
        return orientation === "column" || orientation == null
            ? `${styles.columnCtr} ${styles.input}`
            : `${styles.rowCtr} ${styles.input}`;
    };

    return (
        <div className={constructContainerStyle()}>
            <label htmlFor={getLowerCaseTitle(id)}>{getPascalCase(title ?? id)}</label>
            <input
                ref={ref}
                type="text"
                hidden
                required
                minLength={minLength}
                maxLength={maxLength}
                name={getLowerCaseTitle(id)}
                id={getLowerCaseTitle(id)}
                value={value}
                onChange={() => {}}
            />
            {children}
        </div>
    );
});
