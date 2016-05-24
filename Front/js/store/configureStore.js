import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(rootReducer, initialState, applyMiddleware(ReduxThunk));
  return store
}