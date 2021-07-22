import { CLEAR_SEARCH, SEARCH_PLAYERS } from "../actions/types";

const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_PLAYERS:
      return { results: action.payload };
    case CLEAR_SEARCH:
      return { results: [] };
    default:
      return state;
  }
};

export default searchReducer;
