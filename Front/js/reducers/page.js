'use strict';

import  { SET_YEAR } from '../constants/';

const initialState = {
    page: 'page',
    year : '2016',
    fetching: false
};

export default function userstate(state = initialState,action) {
    switch (action.type) {
        case SET_YEAR:
            return  Object.assign({}, state, {
                year: action.payload
            });

        default:
            return state;
    }
}
