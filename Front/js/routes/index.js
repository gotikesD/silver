import { IndexRoute, Route } from 'react-router';

import AdminComponent from '../components/AdminComponent';
import App from '../MainContainer';
import CartComponent from '../components/CartComponent';
import HomeContent from '../components/HomeContent';
import ItemInfoComponent from '../components/ItemInfoComponent';
import TopCarsComponent from '../components/TopCarsComponent';
import UserComponent from '../components/UserComponent';
import UserDetailComponent from '../components/UserDetailComponent';
import React from 'react'

export default (
    <div>
        <Route path="/" component={App} >
            <IndexRoute component={HomeContent} />
            <Route path='/profile/' component={UserComponent} />
            <Route path='/profile/admin/' component={AdminComponent} />
            <Route path='/user/:id' component={UserDetailComponent} />
            <Route path='/cart/' component={CartComponent} />
            <Route path='/cars/top' component={TopCarsComponent} />
            <Route path='/cars/:id' component={ItemInfoComponent} />
        </Route>
    </div>
)
