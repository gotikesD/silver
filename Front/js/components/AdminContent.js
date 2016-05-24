import React, { Component } from 'react';
import  api from '../api/'
import * as pageActions from '../actions/index'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class AdminContent extends Component {


  render() {

    if (this.props.allUsers) {
      var users = this.props.allUsers.map((i) => {
        return (
          <tr key={i._id} style={ { 'height' : `40px` } }>
            <td>{i.name}</td>
            <td>{i.email}</td>
            <td>{i.DOB ? i.DOB : `Not Indicated`}</td>
            <td>{i.rules}</td>
            <td><Link to={`/user/${i._id}`}> Detail Info</Link></td>
          </tr>
        )
      })
    }

    if (this.props.topUsers) {

      var topUsers = this.props.topUsers.map((i) => {
        return (
          <tr key={i._id} style={ { 'height' : `40px` } }>
            <td>{i.name}</td>
            <td>{i.email}</td>
            <td>{i.sendOrders}</td>
            <td>{i.rules}</td>
            <td><Link to={`/user/${i._id}`} onClick> Detail Info</Link></td>
          </tr>
        )
      })

    }

    if (this.props.topCars) {

      var topCars = this.props.topCars.map((i) => {
        return (
          <tr key={i._id} style={ { 'height' : `40px` } }>
            <td>{i.model}</td>
            <td>{i.make}</td>
            <td>{i.carState}</td>
            <td>{i.bought}</td>
            <td><Link to={`/cars/${i._id}`}> Detail Info</Link></td>
          </tr>
        )
      })

    }

    if (this.props.lastOrders) {
      let count = 0;
      var lastOrders = this.props.lastOrders.map((i) => {

        return (
          <div key={count++} style={ { 'height' : `30px` } }>
            {i}
          </div>
        )
      });

    }

    return (
      <div>
        <div id="default" style={this.props.actionName === '' ? { 'display' : 'block' } : { 'display' : 'none' } }>
          <h1 style={{'textAlign' : 'center', 'marginBottom' : '20px'}}>Admin page</h1>
          <h3 style={{'textAlign' : 'center'}}>Choose one of the above</h3>
        </div>
        <div id="viewUsers"
             style={this.props.actionName === `viewUsers` ? { 'display' : 'block' } : { 'display' : 'none' } }>
          <h3>All users info</h3>
          <div>
            <table>
              <thead>
              <tr style={ { 'height' : '45px' } }>
                <th>Name</th>
                <th>Email</th>
                <th>Date of birth</th>
                <th>Rules</th>
              </tr>
              </thead>
              <tbody>
              {users}
              </tbody>
            </table>
          </div>
        </div>
        <div id="topUsers" style={this.props.actionName === `topUsers` ? { 'display' : 'block' } : { 'display' : 'none' } }>
          <h3>Top users Info</h3>
          <table>
            <thead>
            <tr style={{'height' : `45px`}}>
              <th>Name</th>
              <th>Email</th>
              <th>Send orders</th>
              <th>Rules</th>
            </tr>
            </thead>
            <tbody>
            {topUsers}
            </tbody>
          </table>
        </div>
        <div id="topCars" style={this.props.actionName === `topCars` ? { 'display' : 'block' } : { 'display' : 'none' } }>
          <h3>Top cars</h3>
          <table>
            <thead>
            <tr style={ { 'height' : '45px' } }>
              <th>Model</th>
              <th>Make</th>
              <th>Car state</th>
              <th>Bought</th>
            </tr>
            </thead>
            <tbody>
            {topCars}
            </tbody>
          </table>
        </div>
        <div id="lastWeekOrders"
             style={this.props.actionName === `lastWeekOrders` ? { 'display' : 'block' } : { 'display' : 'none' } }>
          <h3 style={ { 'marginBottom' : '20px' } }>Last week orders</h3>
          {lastOrders}
        </div>
      </div>
    );
  }
}

export default AdminContent
