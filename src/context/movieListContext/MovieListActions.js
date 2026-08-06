export const getMovieListsStart = () => ({
  type: 'GET_MOVIE_LISTS_START',
})

export const getMovieListsSuccess = (lists) => ({
  type: 'GET_MOVIE_LISTS_SUCCESS',
  payload: lists
})

export const getMovieListsFailure = (error) => ({
  type: 'GET_MOVIE_LISTS_FAILURE',
  payload: error
})

export const deleteMovieListStart = () => ({
  type: 'DELETE_MOVIE_LIST_START',
})

export const deleteMovieListSuccess = (id) => ({
  type: 'DELETE_MOVIE_LIST_SUCCESS',
  payload: id
})

export const deleteMovieListFailure = (error) => ({
  type: 'DELETE_MOVIE_LIST_FAILURE',
  payload: error
})

export const createMovieListStart = () => ({
  type: 'CREATE_MOVIE_LIST_START',
})

export const createMovieListSuccess = (list) => ({
  type: 'CREATE_MOVIE_LIST_SUCCESS',
  payload: list
})

export const createMovieListFailure = (error) => ({
  type: 'CREATE_MOVIE_LIST_FAILURE',
  payload: error
})

export const updateMovieListStart = () => ({
  type: 'UPDATE_MOVIE_LIST_START',
})

export const updateMovieListSuccess = (list) => ({
  type: 'UPDATE_MOVIE_LIST_SUCCESS',
  payload: list
})

export const updateMovieListFailure = (error) => ({
  type: 'UPDATE_MOVIE_LIST_FAILURE',
  payload: error
})