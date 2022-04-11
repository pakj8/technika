import { 
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAIL,
  GET_ALL_EVENTS_START,
  GET_EVENT_START,
  GET_EVENT_SUCCESS,
  GET_EVENT_FAIL,
 } from '../constants/user';

const initialState = {
  events: [],
  loading: false,
  error: null,
  event: {},
};

const eventReducer = (state = initialState, action) => {

  switch (action.type) {
    case GET_ALL_EVENTS_START:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };
    case GET_ALL_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case GET_EVENT_START:
      return {
        ...state,
        loading: true,
      };
    case GET_EVENT_SUCCESS:
      return {
        ...state,
        event: action.payload,
        loading: false,
      };
    case GET_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }

}

export default eventReducer;