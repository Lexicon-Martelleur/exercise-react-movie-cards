import React, { ReactElement } from "react";
import { v4 as uuid } from 'uuid';

import { maxRating } from "../../../../service";
import { icons } from "../../../../assets";
import { Icon } from "../../../../components";
import styles from "./StarRating.module.css";

interface Props {
    rating: number;
    updateRating?: (value: number) => void
}

export const StarRating: React.FC<Props> = ({
    rating,
    updateRating
}): ReactElement => {
    const handleRating = (value: number) => {
        updateRating != null && updateRating(value)
    }

    return (
        <div className={styles.starRating}>
        {Array.from({ length: maxRating }, (_, index) => index + 1)
        .map(value => <div key={uuid()}
            className={styles.starRatingIcon}
            onClick={_ => handleRating(value)}>
            {value > rating
                ? <Icon size={"medium"} icon={icons.gradeUnchecked}/>
                : <Icon size={"medium"} icon={icons.gradeChecked}/>}
            </div>)}
        </div>
    )
}