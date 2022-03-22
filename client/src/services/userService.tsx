import axios from "axios";
import IUser from "../interfaces/User.interface";
const USERS_API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

export const addUser = async (newUser: Partial<IUser>) => {
  try {
    const response = await axios.post(USERS_API_URL + "/signup", newUser);
    return response;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};

export const logInUser = async (logInUser: Partial<IUser>) => {
  try {
    const response = await axios.post(USERS_API_URL + "/login", logInUser);
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.error(err);
  }
};
