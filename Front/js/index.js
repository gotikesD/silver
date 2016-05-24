'use strict';
import 'babel-polyfill'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import React from 'react'
import routes from './routes'
import configureStore from './store/configureStore'
const store = configureStore();

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>,
    document.getElementById(`root`)
);

