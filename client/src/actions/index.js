import axios from "axios";
import balldontlie from "../apis/balldontlie";
import requests from "../apis/requests";
import {
  FETCH_PLAYERS,
  FETCH_USER,
  FETCH_PLAYER,
  FETCH_STATS,
  FETCH_SEASON_AVERAGES,
  FETCH_TEAMS,
  UPDATE_USER_FAVORITE_PLAYERS,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data,
  });
};

export const updateUserFavoritePlayers = (players) => async (dispatch) => {
  console.log(players);
  const res = await axios.patch("/api/current_user", {
    favoritePlayers: players,
  });
  dispatch({
    type: UPDATE_USER_FAVORITE_PLAYERS,
    payload: res.data,
  });
};

export const fetchPlayers =
  (text = "") =>
  async (dispatch) => {
    const res = await balldontlie.get(requests.getPlayers, {
      params: {
        search: text,
      },
    });
    dispatch({
      type: FETCH_PLAYERS,
      payload: res.data.data,
    });
  };

export const fetchPlayer = (id) => async (dispatch) => {
  const res = await balldontlie.get(`${requests.getPlayers}/${id}`);
  dispatch({
    type: FETCH_PLAYER,
    payload: res.data,
  });
};

export const fetchStats =
  (id, season, postseason = false, page = 0) =>
  async (dispatch) => {
    const res = await balldontlie.get(requests.getStats, {
      params: {
        player_ids: [id],
        seasons: [season],
        page,
        postseason: postseason,
      },
    });
    dispatch({
      type: FETCH_STATS,
      payload: res.data,
    });
  };

export const fetchSeasonAverages = (id, season) => async (dispatch) => {
  const res = await balldontlie.get(requests.getSeasonAverages, {
    params: {
      player_ids: [id],
      season,
    },
  });
  dispatch({
    type: FETCH_SEASON_AVERAGES,
    payload: res.data.data,
  });
};

export const fetchTeams = () => async (dispatch) => {
  const res = await balldontlie.get(requests.getTeams);
  dispatch({
    type: FETCH_TEAMS,
    payload: res.data.data,
  });
};
