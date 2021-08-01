import { FETCH_AUTH, UPDATE_USER_FAVORITE_PLAYERS } from "../actions/types";

const authReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_AUTH:
      return action.payload || false;
    case UPDATE_USER_FAVORITE_PLAYERS:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
