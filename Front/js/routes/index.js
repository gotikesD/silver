import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from '../MainContainer';
import HomeContent from '../components/HomeContent';
import About from '../components/About';


export default (
    <div>
        <Route path="/" component={App} >
            <IndexRoute component={HomeContent} />
            <Route path='/about' component={About} />
        </Route>
    </div>
)