import axios from "axios";
import jwt_decode from "jwt-decode";

import setJWT from "../toolKit/setJWT";
import { SET_CURRENT_USER, GET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

// set current user data to auth state
export const setCurrentUser = currentUser => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser
  };
};

// Register User
export const registerNewUser = (userData, history) => async dispatch => {
  // Post new user to the api address through axios package,
  // the userData obj will be as the keys value pass to server,
  // like req.body.name, req.body.email
  await axios
    .post("/api/users/register", userData)
    .then(res => {
      const reinitialErrors = {};
      dispatch({
        type: GET_ERRORS,
        payload: reinitialErrors
      });

      history.push("/login"); // redirect to login page
    })
    .catch(err => {
      // console.log("it's err: " + err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        // response is in the return err

        // pass the payload to errorsReducer;
        // errors passing path:
        // Register View -> Actions Register -> errorsReducer -> rootReducer -> store.state.errors
      });
    });
};

// Login - Get User Token --> authReducer or errorsReducer
export const loginUser = userData => async dispatch => {
  await axios
    .post("/api/users/login", userData) // Will get a token from login api
    .then(res => {
      // Destruct token from res.data
      const { token } = res.data;

      // save token to localStorage
      localStorage.setItem("jwtToken", token);

      // Set token to authorization header as default header for every request
      setJWT(token);

      // Decode the token using jwt-decode
      // This decoded includes the msg of user like id, name, email so forth...
      const decoded = jwt_decode(token);

      // Set current user info to state-auth through serCurrentUser & dispaching to authReducer
      dispatch(setCurrentUser(decoded));
      dispatch(clearErrors());
    })
    .catch(
      err => dispatch(getErrors(err.response.data))
      // dispatch({
      //   type: GET_ERRORS, // errorsReducer
      //   payload: err.response.data
      // })
    );
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setJWT(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
    payload: {}
  };
};

export const getErrors = errors => {
  return {
    type: GET_ERRORS,
    payload: errors
  };
};
