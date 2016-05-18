import { GET_ALL_GARS , GET_SINGLE_CAR  , GET_TOP_CARS, LOGIN , LOGOUT} from '../constants/'
import api from '../api/index';

function getAll(cars) {
    return {
        type: GET_ALL_GARS,
        payload: cars
    }
}

export  function getAllCars() {
    return dispatch => {
        api.getProducts(
            cars => {
                dispatch(getAll(cars))
            })
    }
}

function getSingleCar(car) {
    return {
        type: GET_SINGLE_CAR,
        payload: car
    }
}

export  function getSingle(id) {
    return dispatch => {
        api.getSingleProduct(id,
            car => {
                dispatch(getSingleCar(car))
            })
    }
}

function getTopCars(topCars) {
    return {
        type: GET_TOP_CARS,
        payload: topCars
    }
}

export  function getTop() {
    return dispatch => {
        api.getTopCars(
            topCars => {
                dispatch(getTopCars(topCars))
            })
    }
}

export function Authorize() {
       return {
            type: LOGIN,
            payload: true
        }
}

export function logout() {
    return {
        type: LOGOUT,
        payload: false
    }
}