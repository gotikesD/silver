'use strict';

import  { GET_ALL_GARS , GET_SINGLE_CAR , GET_TOP_CARS , LOGIN , LOGOUT , GET_YOUR_CART , SINGLE_USER_INFO} from '../constants/';

const initialState = {
    cars : [],
    singleCar : {},
    topCars : [],
    isAuthorized : false,
    cart : {},
    singleUser : {}
};

export default function userstate(state = initialState,action) {
    switch (action.type) {
        case GET_ALL_GARS:
            return  Object.assign({}, state, {
                cars: action.payload
            });
            break;

        case GET_SINGLE_CAR:
            return  Object.assign({}, state, {
                singleCar: action.payload
            });
            break;

        case GET_TOP_CARS:
            return  Object.assign({}, state, {
                topCars: action.payload
            });

        case LOGIN:
            return  Object.assign({}, state, {
                isAuthorized: action.payload
            });

        case LOGOUT:
            return  Object.assign({}, state, {
                isAuthorized: action.payload
            });

        case GET_YOUR_CART:
            return  Object.assign({}, state, {
                cart: action.payload
            });

        case SINGLE_USER_INFO:
            return  Object.assign({}, state, {
                singleUser: action.payload
            });

        default:
            return state;
    }
}
