import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";
import { getBaseUrl } from "../../../api-config";
const baseURL = getBaseUrl();

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(baseURL + '/api/auth/login', user);
    res.data.isAdmin && dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};