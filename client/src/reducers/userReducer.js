import _ from "lodash";
import {
  FETCH_USER,
  FETCH_USERS,
  UPDATE_USER_FAVORITE_PLAYERS,
} from "../actions/types";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_USER:
      return _.uniqWith([...state, ...action.payload], _.isEqual);
    case FETCH_USERS:
      return action.payload;
    case UPDATE_USER_FAVORITE_PLAYERS:
      return state.map((user) => {
        if (user.googleId === action.payload.googleId) {
          return action.payload;
        } else {
          return user;
        }
      });
    default:
      return state;
  }
};

export default userReducer;
