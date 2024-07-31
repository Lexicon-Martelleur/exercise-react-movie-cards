import expandContent from "./expand_content.svg";
import collapseContent from "./collapse_content.svg";

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
  }
} as const;
