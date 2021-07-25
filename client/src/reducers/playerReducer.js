import _ from "lodash";
import { FETCH_PLAYER, FETCH_PLAYERS } from "../actions/types";

const playerReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PLAYERS:
      return action.payload;
    case FETCH_PLAYER:
      return _.uniqWith([...state, action.payload], _.isEqual);
    default:
      return state;
  }
};

export default playerReducer;