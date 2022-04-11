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
  GET_ALL_EVENTS_START,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  GET_EVENT_START,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAIL
} from '../constants/user';

import axios from 'axios';

const register = (user) => async (dispatch) => {
  dispatch({ type: REGISTER_START });
  try {
    const res = await axios.post('/api/v1/register', user);
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: REGISTER_FAIL, payload: err.response.data });
  }
};

const userLogin = (user) => async (dispatch) => {
  dispatch({ type: LOGIN_START });
  try {
    const res = await axios.post('/api/v1/login', user);
    console.log(res);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: LOGIN_FAIL, payload: err.response.data });
  }
}

const addMember = (user) => async (dispatch) => {
  dispatch({ type: ADD_MEMBER_START });
  try {
    const res = await axios.post('/api/v1/member', user);
    dispatch({ type: ADD_MEMBER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: ADD_MEMBER_FAIL, payload: err.response.data });
  }
}

const deleteMember = (email) => async (dispatch) => {
  dispatch({ type: DELETE_MEMBER_START });
  try {
    const res = await axios.delete(`/api/v1/member`, { data: { email } });
    console.log(res);
    dispatch({ type: DELETE_MEMBER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: DELETE_MEMBER_FAIL, payload: err.response.data });
  }
}

const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_START });
  try {
    const res = await axios.get('/api/v1/me');
    dispatch({ type: GET_USER_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_USER_FAIL, payload: err.response.data });
  }
}

const getAllEvents = () => async (dispatch) => {
  dispatch({ type: GET_ALL_EVENTS_START });
  try {
    const res = await axios.get('/api/v1/events');
    dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: res.data.events });
  } catch (err) {
    dispatch({ type: GET_ALL_EVENTS_FAIL, payload: err.response.data });
  }
}

const getEvent = (id) => async (dispatch) => {
  dispatch({ type: GET_EVENT_START });
  try {
    const res = await axios.get(`/api/v1/event/${id}`);
    dispatch({ type: GET_EVENT_SUCCESS, payload: res.data.event });
  } catch (err) {
    dispatch({ type: GET_EVENT_FAIL, payload: err.response.data });
  }
}

export {
  userLogin,
  addMember,
  deleteMember,
  getUser,
  getAllEvents,
  getEvent,
  register
}