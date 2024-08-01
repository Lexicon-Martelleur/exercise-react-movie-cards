import expandContent from "./expand_content.svg";
import collapseContent from "./collapse_content.svg";
import gradeChecked from "./grade_checked.svg";
import gradeUnchecked from "./grade_unchecked.svg";

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
  }
} as const;
