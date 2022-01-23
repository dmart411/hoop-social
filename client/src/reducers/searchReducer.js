import { SEARCH_PLAYERS } from "../actions/types";

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case SEARCH_PLAYERS:
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;