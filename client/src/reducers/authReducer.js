import { SET_CURRENT_USER } from "../actions/actionTypes";
import isEmpty from "../toolKit/isEmpty";

const initialState = {
  user: {},
  isValidToLogin: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isValidToLogin: !isEmpty(action.payload)
      };

    default:
      return state;
  }
};

export default authReducer;
