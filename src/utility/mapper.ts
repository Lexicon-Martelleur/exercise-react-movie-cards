import { MovieDTO, IMovieCardEntity } from "../model";

export function mapMovieDTOToMovieCardEntity (
    movieDTO: MovieDTO
): IMovieCardEntity {
    return {
        id: `${movieDTO.id}`,
        moviecard: {
            title: movieDTO.title,
            rating: movieDTO.rating,
            description: movieDTO.description,
            timeStamp: movieDTO.timeStamp
        }
    }
}
