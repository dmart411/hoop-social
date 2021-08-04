import {
  FETCH_POST,
  FETCH_POSTS,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST,
} from "../actions/types";

const postReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_POST:
      return [...state, action.payload];
    case FETCH_POST:
      return [...state, action.payload];
    case FETCH_POSTS:
      return action.payload;
    case DELETE_POST:
      return state.filter((post) => {
        return post._id !== action.payload;
      });
    case UPDATE_POST:
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return Object.assign({}, post, {
            comments: action.payload.comments,
          });
        }
        return post;
      });

    default:
      return state;
  }
};

export default postReducer;
