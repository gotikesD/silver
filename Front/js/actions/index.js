import { GET_ALL_GARS , GET_SINGLE_CAR,
         GET_TOP_CARS, LOGIN , LOGOUT ,
         GET_YOUR_CART , SINGLE_USER_INFO ,
         GET_ALL_USERS , GET_TOP_USERS ,
         GET_TOP_CARS_ADMIN , GET_LAST_ORDERS } from '../constants/'
import api from '../api/index';

function getAll(cars) {
    return {
        type: GET_ALL_GARS,
        payload: cars
    }
}

export  function getAllCars(perPage,page) {
    return dispatch => {
        api.getProducts(perPage,page,
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

function viewCart(cartContent) {
    return {
        type: GET_YOUR_CART,
        payload: cartContent
    }
}

export  function getCart(orderId, token) {
    return dispatch => {
        api.viewCart( orderId, token,
            cartContent => {
                dispatch(viewCart(cartContent))
            })
    }
}


function setSingleUser(singleUser) {
    return {
        type: SINGLE_USER_INFO,
        payload: singleUser
    }
}

export  function singleUserInfo(id, token) {
    return dispatch => {
        api.getSingleUserInfo( id, token,
            singleUser => {
                dispatch(setSingleUser(singleUser))
            })
    }
}


function setAllUsers(users) {
    return {
        type: GET_ALL_USERS,
        payload: users
    }
}

export  function allUsersInfo() {
    return dispatch => {
        api.getAllUsers(
            users => {
                dispatch(setAllUsers(users))
            })
    }
}


function setTopUsers(users) {
    return {
        type: GET_TOP_USERS,
        payload: users
    }
}

export  function topUsersInfo() {
    return dispatch => {
        api.getTopUsers(
            users => {
                dispatch(setTopUsers(users))
            })
    }
}

function setTopCars(cars) {
    return {
        type: GET_TOP_CARS_ADMIN,
        payload: cars
    }
}

export  function topCarsInfo() {
    return dispatch => {
        api.getTopCars(
            users => {
                dispatch(setTopCars(users))
            })
    }
}


function setLastOrders(orders) {
    return {
        type: GET_LAST_ORDERS,
        payload: orders
    }
}

export  function lastOrdersInfo() {
    return dispatch => {
        api.getLastWeek(
            orders => {
                dispatch(setLastOrders(orders))
            })
    }
}