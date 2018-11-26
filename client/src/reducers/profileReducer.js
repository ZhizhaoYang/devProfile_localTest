import {
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  PROFILE_LOADING
} from "../actions/actionTypes";

const initialState = {
  userProfile: null,
  profiles: null,
  otherProfile: null,
  loading: false
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };

    default:
      return state;
  }
};

export default profileReducer;
