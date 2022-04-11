import { 
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADD_MEMBER_START,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL,
  DELETE_MEMBER_START,
  DELETE_MEMBER_SUCCESS,
  DELETE_MEMBER_FAIL,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
 } from '../constants/user';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
  isAuthenticated: localStorage.getItem('user') ? true : false,
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case LOGOUT:
      localStorage.removeItem('user');
      return {
        ...state,
        user: {},
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case ADD_MEMBER_START:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_MEMBER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_MEMBER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    case DELETE_MEMBER_START:
      return {
        ...state,
        isLoading: true,
      };
    case DELETE_MEMBER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case DELETE_MEMBER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    case GET_USER_START:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

export default userReducer;