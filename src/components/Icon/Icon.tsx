import { ReactElement } from "react";

import { IIcon } from "./types";
import styles from "./Icon.module.css";
import { IconSizeType } from "./types";
import React from "react";

interface Props {
  icon: IIcon;
  size?: IconSizeType;
  className?: string
}

export const Icon: React.FC<Props> = ({
  icon,
  size,
  className
}): ReactElement => {
  return (
    <>
      {(size === "small" || size == null) && 
        <img className={`${className ?? ""}`} {...icon} />}
      {size === "medium" && 
        <img className={`${styles.medium} ${className ?? ""}`} {...icon} />}
      {size === "large" &&
        <img className={`${styles.large} ${className ?? ""}`} {...icon} />}
      {size === "xlarge" &&
        <img className={`${styles.xlarge} ${className ?? ""}`} {...icon} />}
    </>
  );
}
