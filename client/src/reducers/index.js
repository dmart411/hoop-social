import { combineReducers } from "redux";
import authReducer from "./authReducer";
import playerReducer from "./playerReducer";
import statReducer from "./statReducer";

export default combineReducers({
  auth: authReducer,
  players: playerReducer,
  stats: statReducer
});
