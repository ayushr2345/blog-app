import axios from "axios";
import IBlog from "../interfaces/Blog.interface";
import IUser from "../interfaces/User.interface";
const USERS_API_URL = "http://localhost:5000";
axios.defaults.withCredentials = true;

/*
 ********** USERS **********
 */

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

// GET A USER TO DISPLAY IN THE BLOG CARD
export const GetUser = async (blog: Partial<IBlog>) => {
  try {
    const response = await axios.post(USERS_API_URL + "/auth/get-name", blog, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.log(err);
  }
};

/*
 ********** BLOGS **********
 */

// ADD A BLOG
export const AddBlog = async (blog: Partial<IBlog>) => {
  try {
    const response = await axios.post(USERS_API_URL + "/auth/blog/add", blog, {
      withCredentials: true,
    });
    //console.log(response);
    return response.data;
  } catch (err) {
    console.log(USERS_API_URL);
    console.log(err);
  }
};

// GET ALL BLOGS
export const GetAllBlogs = async () => {
  try {
    const response = await axios.get(USERS_API_URL + "/auth/blog/get-all");
    //console.log(response.data.blogs);
    return response.data.blogs;
  } catch (err) {
    console.log(USERS_API_URL);
    console.log(err);
  }
};

// GET A BLOG
export const GetABlog = async (id: String) => {
  try {
    const response = await axios.post(
      USERS_API_URL + "/auth/blog/get-one",
      {id: id},
      { withCredentials: true }
    );
    //console.log(response.data);
    return response.data.blogs;
  } catch (err) {
    console.log(USERS_API_URL);
    console.log(err);
  }
};
