import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constain";
import setAuthToken from "../utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispacth] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
  });

  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
    }

    try {
      const response = await axios.get(`${apiUrl}/auth`);

      if (response.data.success) {
        dispacth({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.user,
          },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      setAuthToken(null);
      dispacth({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, messeage: error.messeage };
    }
  };

  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      } else return { success: false, messeage: error.messeage };
    }
  };

  //LOGOUT USER
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispacth({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  const AuthContextData = { logoutUser, authState, loginUser, registerUser };
  return (
    <AuthContext.Provider value={AuthContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
