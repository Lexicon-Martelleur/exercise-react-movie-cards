import { ReactElement, useEffect, useState } from "react";

import styles from "./SelectMenu.module.css";
import { icons } from "../../assets";
import { Icon } from "../Icon";
import { INameObject } from "../../model";

interface Props<OptionType extends INameObject> {
    title: string;
    options: Set<OptionType>;
    selectedOptionIds: Set<string>;
    open: boolean;
    onSelectOption: (optionId: string) => void;
    onOpenMenu: (title: string) => void;
}

export const SelectMenu: React.FC<Props<INameObject>> = ({
    title,
    options,
    selectedOptionIds,
    open,
    onSelectOption,
    onOpenMenu
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(open);

    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const getSelectButtonClassNames = () => {
        return `${styles.selectButton} ${isOpen ? styles.selectOpen : ""}`;
    };

    const getOptionMarkClassNames = (option: INameObject) => {
        const isSelected = [...selectedOptionIds.values()].find(id => id === option.id) != null;
        return `${styles.optionMark} ${isSelected ? styles.optionSelected : ""}`;
    };

    const toggleOpen: React.MouseEventHandler<HTMLButtonElement> = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            onOpenMenu(title);
        }
    };

    const handleSelect = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        option: INameObject
    ) => {
        event.stopPropagation();
        onSelectOption(option.id);
    };

    return (
        <article className={styles.selectArticle}>
            <button
                type="button" 
                className={getSelectButtonClassNames()}
                onClick={toggleOpen}>
                <p className={styles.selectLabel}>{title}</p>
                <Icon icon={icons.arrowDown} size="medium"/>
                {isOpen && (
                <div className={styles.optionCtr}>
                    {[...options.values()].map((option) => (
                        <div
                            key={option.id}
                            className={styles.optionItem}
                            onClick={(event) => { handleSelect(event, option); } }
                        >
                            <p className={styles.optionLabel}>
                                {option.name}
                            </p>
                            <div
                                className={getOptionMarkClassNames(option)}>
                            </div>
                        </div>
                    ))}
                </div>
                )}
            </button>
        </article>
    );
};
