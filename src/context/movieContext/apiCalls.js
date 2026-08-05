import axios from "axios";

import { getBaseUrl } from "../../../api-config";
import { deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions";
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