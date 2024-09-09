export function getMovieAPI (): string {
    return import.meta.env.VITE_MOVIE_API;
}

export function isDevelopment (): boolean {
    return !isProduction();
}

export function isProduction (): boolean {
    return import.meta.env.PROD;
}

export function getTodoAPIMaxTimeMilliSeconds (): number {
    return Number(import.meta.env.VITE_MOVIE_API_MAX_TIME) * 1000;
}
