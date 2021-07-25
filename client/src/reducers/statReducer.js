import { FETCH_STATS, FETCH_SEASON_AVERAGES } from "../actions/types";

const statReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_STATS:
      return { ...state, game_stats: action.payload };
    case FETCH_SEASON_AVERAGES:
      return {
        ...state,
        season_averages: action.payload,
      };
    default:
      return state;
  }
};

export default statReducer;
