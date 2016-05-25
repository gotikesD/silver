import React, { Component } from 'react';
import api from '../api/'
import { bindActionCreators } from 'redux'
import * as pageActions from '../actions/index'
import { connect } from 'react-redux';
import { Link } from 'react-router';

class UserDetailComponent extends Component {

    componentWillMount() {
        let id = this.props.params.id;
        let token = localStorage.getItem('token')
        this.props.pageActions.singleUserInfo(id, token)
    }

    render() {

        const {singleUser} = this.props;

        return (
            <div>
                <h3 style={{'marginBottom' : '30px'}}>Total info about {singleUser.email}</h3>
            <table>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>{singleUser.name}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{singleUser.email}</td>
                </tr>
                <tr>
                    <td>Second Name</td>
                    <td>{singleUser.surName}</td>
                </tr>
                <tr>
                    <td>Rules</td>
                    <td>{singleUser.rules}</td>
                </tr>
                <tr>
                    <td>Created At</td>
                    <td>{singleUser.createdAt}</td>
                </tr>
                <tr>
                    <td>Send orders</td>
                    <td>{singleUser.sendOrders}</td>
                </tr>
                </tbody>
            </table>
                <h3  style={{'marginBottom' : '30px'}}>Own cars. Total - {singleUser.ownCars ? singleUser.ownCars.length : 0}</h3>
                <button type="button" className="itemButtons"><Link to="/profile/admin/">Back</Link></button>
            </div>

        );
    }
}

function mapStateToProps (state) {
    return {
        singleUser : state.mainPage.singleUser
    }
}


function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(UserDetailComponent)