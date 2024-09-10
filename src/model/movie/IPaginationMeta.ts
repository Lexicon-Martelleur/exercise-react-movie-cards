export interface IPaginationMeta {
    PageSize: number;
    PageNr: number;
    TotalItemCount: number;
    TotalPageCount: number;
}

export function isPaginationMeta (obj: unknown): obj is IPaginationMeta {
    if (obj == null || typeof obj !== "object") {
        return false;
    }

    const castObj = obj as IPaginationMeta;
    return (
        typeof castObj.PageSize === "number" &&
        typeof castObj.PageNr === "number" &&
        typeof castObj.TotalItemCount === "number" &&
        typeof castObj.TotalPageCount === "number"
    );
}
