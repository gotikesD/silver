import React, { Component } from 'react';
import Content from './AdminContent'
import api from '../api/'

class AdminComponent extends Component {

    constructor() {
        super();
        this.state = {
            actionName : '',
            allUsers : [],
            topUsers : [],
            topCars : [],
            lastOrders: []
        }
    }

    userActionName(name) {
        this.setState( { actionName : name})
    }

    allUsers() {
        api.getAllUsers((answer) => {
            this.setState( { allUsers : answer})
        })
    }

    topUsers() {
        api.getTopUsers((answer) => {
            console.log(answer)
            this.setState( { topUsers : answer})
        })
    }

    topCars () {
        api.getTopCars((answer) => {
            this.setState( { topCars : answer})
        })
    }

    lastWeek () {
        api.getLastWeek((answer) => {
            console.log(answer)
            this.setState( { lastOrders : answer})
        })
    }

    render() {

        return (
            <div>
                <ul className="user-nav nav navbar-nav  navbar-inverse col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <li class="active" onClick={this.userActionName.bind(this, 'viewUsers')}><a href="#" onClick={this.allUsers.bind(this)}>View Users<span className="sr-only">(current)</span></a></li>
                    <li onClick={this.userActionName.bind(this, 'topUsers')}><a href="#" onClick={this.topUsers.bind(this)}>Top Users</a></li>
                    <li onClick={this.userActionName.bind(this, 'topCars')}><a href="#" onClick={this.topCars.bind(this)}>Top Cars</a></li>
                    <li onClick={this.userActionName.bind(this, 'lastWeekOrders')}><a href="#" onClick={this.lastWeek.bind(this)}>Last week orders</a></li>
                </ul>
                <Content actionName={this.state.actionName}
                         allUsers={this.state.allUsers}
                         lastOrders={this.state.lastOrders}
                         topCars={this.state.topCars}
                         topUsers={this.state.topUsers}/>
            </div>
        );
    }
}

export default AdminComponent;