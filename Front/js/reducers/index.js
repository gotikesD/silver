import { combineReducers } from 'redux'
import mainPage from './page'
import users from './user'
import { routerReducer as routing } from 'react-router-redux'

export default combineReducers({
    mainPage,
    users,
    routing
})