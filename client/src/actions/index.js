import axios from "axios";
import { FETCH_USER, SEARCH_PLAYERS, CLEAR_SEARCH } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const searchPlayers =
  (search = "") =>
  async (dispatch) => {
    const res = await axios.get(`/api/players/${search}`);
    dispatch({
      type: SEARCH_PLAYERS,
      payload: res.data,
    });
  };

export const clearSearch = () => {
  return {
    type: CLEAR_SEARCH,
  };
};
