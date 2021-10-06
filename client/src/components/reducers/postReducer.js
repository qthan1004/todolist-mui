import {
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
} from "../contexts/constain";
export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        posts: payload,
        postLoading: false,
      };

    case POSTS_LOADED_FAIL:
      return {
        ...state,
        posts: [],
        postLoading: false,
      };

    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, payload],
      };

    default:
      return state;
  }
};
