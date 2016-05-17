'use strict';

import  { GET_ALL_GARS , GET_SINGLE_CAR , GET_TOP_CARS } from '../constants/';

const initialState = {
    cars : [],
    singleCar : {},
    topCars : []
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
            break;


        default:
            return state;
    }
}
