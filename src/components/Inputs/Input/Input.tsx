import { ReactElement } from "react";

import styles from "./Input.module.css";

interface Props {
    title: string;
    value: string;
    minLength?: number;
    maxLength?: number;
    orientation?: "row" | "column";
    textArea?: boolean;
    onChange: () => void;
}

export const Input: React.FC<Props> = ({
    title,
    value,
    minLength,
    maxLength,
    orientation,
    textArea,
    onChange
}): ReactElement => {
    const getLowerCaseTitle = (title: string) => {
        return title.toLowerCase()
    }

    const getPascalCase = (title: string) => {
        return title
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const getOrientationStyle = () => {
        return orientation === "column" || orientation == null
            ? `${styles.columnCtr} ${styles.input}`
            : `${styles.rowCtr} ${styles.input}`
    };

    return (
        <div className={getOrientationStyle()}>
            <label htmlFor={getLowerCaseTitle(title)}>{getPascalCase(title)}</label>
            {textArea == null || !textArea
                ? <input type="text"
                    required
                    minLength={minLength}
                    maxLength={maxLength}
                    name={getLowerCaseTitle(title)}
                    id={getLowerCaseTitle(title)}
                    value={value}
                    onChange={onChange} />
                : <textarea rows={5}
                    required
                    minLength={minLength}
                    maxLength={maxLength}
                    name={getLowerCaseTitle(title)}
                    id={getLowerCaseTitle(title)}
                    value={value}
                    onChange={onChange} />
            }
        </div>    
    )
}