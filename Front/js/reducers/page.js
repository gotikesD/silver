'use strict';

import  { GET_ALL_GARS, GET_SINGLE_CAR, GET_TOP_CARS,
  LOGIN, LOGOUT, GET_YOUR_CART, SINGLE_USER_INFO,
  GET_ALL_USERS, GET_TOP_USERS, GET_TOP_CARS_ADMIN, GET_LAST_ORDERS } from '../constants/';

const initialState = {
  cars : [],
  singleCar : {},
  topCars : [],
  isAuthorized : false,
  cart : {},
  singleUser : {},
  allUsers : [],
  topUsers : [],
  topAdminCars : [],
  lastOrders : []
};

export default function userstate(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_GARS:
      return Object.assign({}, state, {
        cars : action.payload
      });
      break;

    case GET_SINGLE_CAR:
      return Object.assign({}, state, {
        singleCar : action.payload
      });
      break;

    case GET_TOP_CARS:
      return Object.assign({}, state, {
        topCars : action.payload
      });

    case LOGIN:
      return Object.assign({}, state, {
        isAuthorized : action.payload
      });

    case LOGOUT:
      return Object.assign({}, state, {
        isAuthorized : action.payload
      });

    case GET_YOUR_CART:
      return Object.assign({}, state, {
        cart : action.payload
      });

    case SINGLE_USER_INFO:
      return Object.assign({}, state, {
        singleUser : action.payload
      });

    case GET_ALL_USERS:
      return Object.assign({}, state, {
        allUsers : action.payload
      });

    case GET_TOP_USERS:
      return Object.assign({}, state, {
        topUsers : action.payload
      });

    case GET_TOP_CARS_ADMIN:
      return Object.assign({}, state, {
        topAdminCars : action.payload
      });

    case GET_LAST_ORDERS:
      return Object.assign({}, state, {
        lastOrders : action.payload
      });

    default:
      return state;
  }
}
