import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from '../MainContainer';
import HomeContent from '../components/HomeContent';
import ItemInfoComponent from '../components/ItemInfoComponent';

export default (
    <div>
        <Route path="/" component={App} >
            <IndexRoute component={HomeContent} />
            <Route path='/cars/:id' component={ItemInfoComponent} />
        </Route>
    </div>
)