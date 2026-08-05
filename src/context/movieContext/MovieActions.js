export const getMoviesStart = () => ({
  type: 'GET_MOVIES_START',
})

export const getMoviesSuccess = (movies) => ({
  type: 'GET_MOVIES_SUCCESS',
  payload: movies
})

export const getMoviesFailure = (error) => ({
  type: 'GET_MOVIES_FAILURE',
  payload: error
})

export const deleteMovieStart = () => ({
  type: 'DELETE_MOVIE_START',
})

export const deleteMovieSuccess = (id) => ({
  type: 'DELETE_MOVIE_SUCCESS',
  payload: id
})

export const deleteMovieFailure = (error) => ({
  type: 'DELETE_MOVIE_FAILURE',
  payload: error
})