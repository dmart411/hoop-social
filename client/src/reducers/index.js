import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import statReducer from "./statReducer";
import teamReducer from "./teamReducer";

export default combineReducers({
  auth: authReducer,
  players: playerReducer,
  stats: statReducer,
  teams: teamReducer,
});
