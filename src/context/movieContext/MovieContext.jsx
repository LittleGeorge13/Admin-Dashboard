import { createContext, useEffect, useReducer } from "react";
import MovieReducer from "./MovieReducer";

const initialState = {
  movies: [],
  isFetching: false,
  errorInfo: null,
  error: false,
};

export const MovieContext = createContext(initialState);

export const MovieContextProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const value = {
    movies: state.movies,
    isFetching: state.isFetching,
    error: state.error,
    dispatch: dispatch
  };
  return(
    <MovieContext.Provider value={ value }>
      { children }
    </MovieContext.Provider>
  );
}