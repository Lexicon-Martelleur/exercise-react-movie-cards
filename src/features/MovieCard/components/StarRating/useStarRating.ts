export const useStarRating = () => {
    const handleRating = (
        value: number,
        updateRating?: (value: number) => void
    ) => {
        updateRating && updateRating(value);
    }

    return { handleRating };
}
