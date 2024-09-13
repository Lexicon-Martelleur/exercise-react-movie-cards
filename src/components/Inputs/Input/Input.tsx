import { ReactElement } from "react";

import styles from "./Input.module.css";

interface Props {
    id: string;
    value: string;
    title?: string;
    minLength?: number;
    maxLength?: number;
    orientation?: "row" | "column";
    textArea?: boolean;
    onChange: (
        () => void) | 
        (React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    );
}

export const Input: React.FC<Props> = ({
    id,
    value,
    title,
    minLength,
    maxLength,
    orientation,
    textArea,
    onChange
}): ReactElement => {
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
            {textArea == null || !textArea
                ? <input type="text"
                    required
                    minLength={minLength}
                    maxLength={maxLength}
                    name={getLowerCaseTitle(id)}
                    id={getLowerCaseTitle(id)}
                    value={value}
                    onChange={onChange} />
                : <textarea rows={5}
                    required
                    minLength={minLength}
                    maxLength={maxLength}
                    name={getLowerCaseTitle(id)}
                    id={getLowerCaseTitle(id)}
                    value={value}
                    onChange={onChange} />
            }
        </div>    
    );
};