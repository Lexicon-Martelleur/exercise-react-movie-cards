/**
 * @TODO Refactor frontend to only rely on server defined genres.
 * Currently solution genres constant on frontend is not insync with api
 * defined genres. 
 */

export const movieGenre = { 
    action: "Action",
    animation: "Animation",
    comedy: "Comedy",
    documentary: "Documentary",
    drama: "Drama",
    fantasy: "Fantasy",
    horror: "Horror",
    unknown: "Unknown"
} as const;

export const maxRating = 5;

export const minRating = 1;

export const minLengthTitle = 1;

export const minLengthDescription = 1;

export const maxLengthTitle = 100;

export const maxLengthDescription = 500;
