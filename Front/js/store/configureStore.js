import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import createLogger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

export default function configureStore(initialState) {
    const logger = createLogger();
    const store = createStore(rootReducer, initialState,applyMiddleware( ReduxThunk));
    return store
}