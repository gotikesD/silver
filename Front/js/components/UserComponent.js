import React, { Component } from 'react';
import Content from './UserComponentContent'
import api from '../api/'

class UserComponent extends Component {

    constructor() {
        super();
        this.state = {
            actionName : '',
            ownCars : []
        }
    }

    userActionName(name) {
        this.setState( { actionName : name})
    }

    viewCars() {
        api.getYourCars((cars) => {
            this.setState( { ownCars : cars})
        })
    }

    render() {

        return (
            <div>
                <ul className="user-nav nav navbar-nav  navbar-inverse col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <li class="active" onClick={this.userActionName.bind(this, 'add')}><a href="#">Add a Car<span className="sr-only">(current)</span></a></li>
                    <li onClick={this.userActionName.bind(this, 'delete')}><a href="#">Delete a car</a></li>
                    <li onClick={this.userActionName.bind(this, 'update')}><a href="#">Update car</a></li>
                    <li onClick={this.userActionName.bind(this, 'view')}><a href="#" onClick={this.viewCars.bind(this)}>View Your Cars</a></li>
                </ul>
                <Content actionName={this.state.actionName} ownCars={this.state.ownCars}/>
            </div>
        );
    }
}

export default UserComponent;