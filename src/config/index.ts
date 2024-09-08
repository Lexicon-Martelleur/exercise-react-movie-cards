export function getMovieAPI (): string {
    return import.meta.env.VITE_MOVIE_API
}

export function isDevelopment (): boolean {
    return import.meta.env.DEV
}

export function getTodoAPIMaxTimeMilliSeconds (): number {
    return Number(import.meta.env.VITE_MOVIE_API_MAX_TIME) * 1000;
}
