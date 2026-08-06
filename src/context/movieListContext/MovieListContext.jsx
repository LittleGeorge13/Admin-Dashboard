import { createContext, useEffect, useReducer } from "react";
import MovieListReducer from "./MovieListReducer";

const initialState = {
  lists: [],
  isFetching: false,
  errorInfo: null,
  error: false,
};

export const MovieListContext = createContext(initialState);

export const MovieListContextProvider = ({
  children
}) => {
  const [state, dispatch] = useReducer(MovieListReducer, initialState);

  const value = {
    lists: state.lists,
    isFetching: state.isFetching,
    error: state.error,
    dispatch: dispatch
  };
  return(
    <MovieListContext.Provider value={ value }>
      { children }
    </MovieListContext.Provider>
  );
}