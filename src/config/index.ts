export function getMovieAPI () {
    return import.meta.env.VITE_API
}

export function isDevelopment () {
    return import.meta.env.DEV
}

export function getTodoAPIMaxTimeMilliSeconds (): number {
    return Number(import.meta.env.VITE_TODO_API_MAX_TIME) * 1000;
}
