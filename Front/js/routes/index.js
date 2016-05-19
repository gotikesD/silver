import React from 'react'
import { Route, IndexRoute } from 'react-router';

import App from '../MainContainer';
import HomeContent from '../components/HomeContent';
import ItemInfoComponent from '../components/ItemInfoComponent';
import TopCarsComponent from '../components/TopCarsComponent';
import CartComponent from '../components/CartComponent';
import UserComponent from '../components/UserComponent';

export default (
    <div>
        <Route path="/" component={App} >
            <IndexRoute component={HomeContent} />
            <Route path='/profile/' component={UserComponent} />
            <Route path='/cart/' component={CartComponent} />
            <Route path='/cars/top' component={TopCarsComponent} />
            <Route path='/cars/:id' component={ItemInfoComponent} />
        </Route>
    </div>
)
