import axios from "axios";

import { getBaseUrl } from "../../../api-config";
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions";
const baseURL = getBaseUrl();

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(baseURL + '/movies', {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (error) {
    dispatch(getMoviesFailure());
  }
}

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    await axios.delete(baseURL + '/movies/' + id, {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    });
    dispatch(deleteMovieSuccess(id));
  } catch (error) {
    dispatch(deleteMovieFailure());
  }
}

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(baseURL + '/movies', movie, {
      headers: {
        token: 'Bearer ' + user.accessToken
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (error) {
    dispatch(createMovieFailure());
  }
}

export const updateMovie = async (movieId, movie, dispatch) => {
  dispatch(updateMovieStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.put(baseURL + '/movies/' + movieId, movie, {
      headers: {
        token: 'Bearer ' + user.accessToken
      },
    });
    dispatch(updateMovieSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieFailure());
  }
}