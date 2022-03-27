import axios from "axios";
import IUser from "../interfaces/User.interface";
const USERS_API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

// SIGNUP
export const addUser = async (newUser: Partial<IUser>) => {
  try {
    const response = await axios.post(USERS_API_URL + "/auth/signup", newUser, {
      withCredentials: true,
    });
    // localStorage.setItem("_id", response.data.user._id);
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};

// LOGIN
export const logInUser = async (logInUser: Partial<IUser>) => {
  try {
    const response = await axios.post(
      USERS_API_URL + "/auth/login",
      logInUser,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};

// LOGOUT
export const logOutUser = async () => {
  try {
    const response = await axios.get(USERS_API_URL + "/auth/logout");
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};

// MATCH A SESSION
export const MatchAUserSession = async () => {
  try {
    const response = await axios.get(USERS_API_URL + "/auth/session");
    //console.log(response.data);
    if (!response.data.user) {
      logOutUser();
    }
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};
