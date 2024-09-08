import expandContent from "./expand_content.svg";
import collapseContent from "./collapse_content.svg";
import gradeChecked from "./grade_checked.svg";
import gradeUnchecked from "./grade_unchecked.svg";
import backspace from "./backspace.svg";
import close from "./close.svg";
import arrowDown from "./arrow_down.svg";


export const icons = {
  expandContent: {
    src: expandContent,
    alt: "Expand content",
    title: "Expand content"
  },
  collapseContent: {
    src: collapseContent,
    alt: "Collapse content",
    title: "Collapse content"
  },
  gradeChecked: {
    src: gradeChecked,
    alt: "Uncheck grade",
    title: "Uncheck grade"
  },
  gradeUnchecked: {
    src: gradeUnchecked,
    alt: "Check grade",
    title: "Check grade"
  },
  close: {
    src: close,
    alt: "Close edit",
    title: "Close edit"
 },
  backspace: {
    src: backspace,
    alt: "Check grade",
    title: "Check grade"
  },
  arrowDown: {
    src: arrowDown,
    alt: "Arrow Down",
    title: ""
  }
} as const;
