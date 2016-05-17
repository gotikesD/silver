import { combineReducers } from 'redux'
import mainPage from './page'
import users from './user'

export default combineReducers({
    mainPage,
    users
})