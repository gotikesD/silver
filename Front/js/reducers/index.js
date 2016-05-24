import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import users from './user'
import mainPage from './page'


export default combineReducers({
  mainPage,
  users,
  routing
})


