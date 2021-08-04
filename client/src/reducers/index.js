import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import statReducer from "./statReducer";
import teamReducer from "./teamReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";

export default combineReducers({
  auth: authReducer,
  players: playerReducer,
  stats: statReducer,
  teams: teamReducer,
  users: userReducer,
  posts: postReducer,
});
