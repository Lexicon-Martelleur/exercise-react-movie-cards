import { useState } from "react";

export const useFreezeState = <T>(initState: T): [
    Readonly<T>,
    React.Dispatch<React.SetStateAction<Readonly<T>>>
] => {
    return useState<Readonly<T>>(initState);
};