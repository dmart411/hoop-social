import { FETCH_STATS, FETCH_SEASON_AVERAGES } from "../actions/types";

const statReducer = (
  state = {
    gameStats: [],
    seasonAverages: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_STATS:
      return { ...state, gameStats: action.payload };
    case FETCH_SEASON_AVERAGES:
      return { ...state, seasonAverages: action.payload};
    default:
      return state;
  }
};

export default statReducer;
