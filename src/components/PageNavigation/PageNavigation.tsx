import React, { ReactElement, ReactNode } from "react";

import styles from "./PageNavigation.module.css";

interface Props {
    page: number;
    nrOfPages: number;
    onNext: () => void;
    onPrev: () => void;
}

interface PropsWithChildren extends Props {
    children?: ReactNode
}

export const PageNavigation: React.FC<PropsWithChildren> = ({
    page,
    nrOfPages,
    children,
    onPrev,
    onNext
}): ReactElement => {

    return (
        <>
            {children == null
                ? <InnerPageNavigation
                    page={page}
                    nrOfPages={nrOfPages}
                    onPrev={onPrev}
                    onNext={onNext}/>
                : (
                    <>
                        <InnerPageNavigation
                            page={page}
                            nrOfPages={nrOfPages}
                            onPrev={onPrev}
                            onNext={onNext}/>
                        {children}
                        <InnerPageNavigation
                            page={page}
                            nrOfPages={nrOfPages}
                            onPrev={onPrev}
                            onNext={onNext}/>
                    </>
                )
            }
        </>
    );
};

const InnerPageNavigation: React.FC<Props> = ({
    page,
    nrOfPages,
    onPrev,
    onNext
}) => {
    const isFirstPage = () => {
        return page === 1;
    };

    const isLastPage = () => {
        return page >= nrOfPages;
    };

    return (
        <article className={styles.pageNavigationArticle}>
            <button
                disabled={isFirstPage()}
                type="button"
                onClick={() => { onPrev(); }}>{"<"}</button>
            <p>{`${page}/${nrOfPages}`}</p>
            <button
               disabled={isLastPage()}
                type="button"
                onClick={() => { onNext(); }}>{">"}</button>
        </article>
    );
};
