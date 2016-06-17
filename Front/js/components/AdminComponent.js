import React, { Component } from 'react';
import Content from './AdminContent'
import api from '../api/'
import * as pageActions from '../actions/index'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class AdminComponent extends Component {

  constructor() {
    super();
    this.state = {
      actionName : ``
    }
  }

  userActionName(name) {
    this.setState({ actionName : name })
  }

  allUsers() {
    this.props.pageActions.allUsersInfo()
  }

  topUsers() {
    this.props.pageActions.topUsersInfo()
  }

  topCars() {
    this.props.pageActions.topCarsInfo()
  }

  lastWeek() {
    this.props.pageActions.lastOrdersInfo()
  }

  render() {

    return (
      <div>
        <ul className="user-nav nav navbar-nav  navbar-inverse col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <li class="active" onClick={this.userActionName.bind(this, `viewUsers`)}><a href="#"
                                                                                      onClick={this.allUsers.bind(this)}>View
            Users<span className="sr-only">(current)</span></a></li>
          <li onClick={this.userActionName.bind(this, `topUsers`)}><a href="#" onClick={this.topUsers.bind(this)}>Top
            Users</a></li>
          <li onClick={this.userActionName.bind(this, `topCars`)}><a href="#" onClick={this.topCars.bind(this)}>Top
            Cars</a></li>
          <li onClick={this.userActionName.bind(this, `lastWeekOrders`)}><a href="#" onClick={this.lastWeek.bind(this)}>Last
            week orders</a></li>
        </ul>
        <Content actionName={this.state.actionName}
                 allUsers={this.props.allUsers}
                 lastOrders={this.props.lastOrders}
                 topCars={this.props.topAdminCars}
                 topUsers={this.props.topUsers}/>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    allUsers : state.mainPage.allUsers,
    topUsers : state.mainPage.topUsers,
    topAdminCars : state.mainPage.topAdminCars,
    lastOrders : state.mainPage.lastOrders
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions : bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminComponent)