import axios from "axios";

import { getBaseUrl } from "../../../api-config";
import { createMovieListFailure, createMovieListStart, createMovieListSuccess, deleteMovieListFailure, deleteMovieListStart, deleteMovieListSuccess, getMovieListsFailure, getMovieListsStart, getMovieListsSuccess, updateMovieListFailure, updateMovieListStart, updateMovieListSuccess } from "./MovieListActions";
const baseURL = getBaseUrl();

export const getMovieLists = async (dispatch) => {
  dispatch(getMovieListsStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.get(baseURL + '/lists', {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    });
    dispatch(getMovieListsSuccess(res.data));
  } catch (error) {
    dispatch(getMovieListsFailure());
  }
}

export const deleteMovieList = async (id, dispatch) => {
  dispatch(deleteMovieListStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    await axios.delete(baseURL + '/lists/' + id, {
      headers: {
        token: 'Bearer ' + user.accessToken
      }
    });
    dispatch(deleteMovieListSuccess(id));
  } catch (error) {
    dispatch(deleteMovieListFailure());
  }
}

export const createMovieList = async (list, dispatch) => {
  dispatch(createMovieListStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.post(baseURL + '/lists', list, {
      headers: {
        token: 'Bearer ' + user.accessToken
      },
    });
    dispatch(createMovieListSuccess(res.data));
  } catch (error) {
    dispatch(createMovieListFailure());
  }
}

export const updateList = async (listId, list, dispatch) => {
  dispatch(updateMovieListStart());
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const res = await axios.put(baseURL + '/lists/' + listId, list, {
      headers: {
        token: 'Bearer ' + user.accessToken
      },
    });
    dispatch(updateMovieListSuccess(res.data));
  } catch (error) {
    dispatch(updateMovieListFailure());
  }
}