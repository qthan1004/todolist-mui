import { createContext, useReducer, useState } from "react";
import { postReducer } from "../reducers/postReducer";
import {
  apiUrl,
  POSTS_LOADED_SUCCESS,
  POSTS_LOADED_FAIL,
  ADD_POST,
} from "./constain";
import axios from "axios";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [postState, dispacth] = useReducer(postReducer, {
    posts: [],
    postLoading: true,
  });

  const [showAddPost, setShowAddPost] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const getPost = async () => {
    try {
      const response = await axios.get(`${apiUrl}/post`);

      if (response.data.success) {
        dispacth({
          type: POSTS_LOADED_SUCCESS,
          payload: response.data.posts,
        });
      }
    } catch (error) {
      dispacth({
        type: POSTS_LOADED_FAIL,
      });
    }
  };

  const addPost = async (newPost) => {
    try {
      const response = await axios.post(`${apiUrl}/post`, newPost);
      if (response.data.success) {
        dispacth({
          type: ADD_POST,
          payload: response.data.post,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  const postContextData = {
    addPost,
    postState,
    getPost,
    showAddPost,
    setShowAddPost,
    isComplete,
    setIsComplete,
  };
  return (
    <PostContext.Provider value={postContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
