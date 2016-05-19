import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../api/'
import * as pageActions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
var jwtDecode = require('jwt-decode');

class HeaderComponent extends Component {

    componentWillMount() {
        let token = localStorage.getItem('token')
        if(token) {
            this.props.pageActions.Authorize();
        }
    }

    signHandle() {
        api.signUpUser(this.refs.name.value,
                       this.refs.secondName.value,
                       this.refs.email.value,
                       this.refs.password.value,
                       this.refs.DOB.value, (data) => {
                if(data) {

                    $('#signSuccess').css({"opacity":"1","z-index" :"100"});
                    setTimeout(() => {
                        $('#signSuccess').css({"opacity":"0","z-index" :"100"})
                    },2000)
                }
            });

        this.refs.name.value='';
        this.refs.secondName.value='';
        this.refs.email.value='';
        this.refs.password.value='';
        this.refs.DOB.value='';
    }

    loginHandle() {
        api.login(this.refs.emailL.value,
                  this.refs.passwordL.value, (answer) => {

                let token = localStorage.setItem("token", answer);
                this.props.pageActions.Authorize();
                this.refs.emailL.value='';
                this.refs.passwordL.value='';
            })
    }

    logoutHandle() {
        window.localStorage.clear();
        this.props.pageActions.logout();
    }

    viewCart() {
        let token = localStorage.getItem('token');
        let orderId = localStorage.getItem('orderId');
        this.props.pageActions.getCart(token,orderId);
    }

    render() {
        let token = localStorage.getItem('token');
        if(token) {
          let user = jwtDecode(token);
          var email = user._doc.email
        }

        return (
            <header>
                <nav className="navbar navbar-inverse">
                    <div className="navbar-header col-md-1">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand logo" href="#">Brand</a>
                    </div>

                    <div className="collapse navbar-collapse " id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav ">
                            <li className="active"><Link to="/">Main <span className="sr-only">(current)</span></Link></li>
                            <li><Link to="/cars/top" >Top Cars</Link></li>
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Categories<span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Sport</a></li>
                                    <li><a href="#">Family</a></li>
                                    <li><a href="#">Cheap</a></li>
                                    <li><a href="#">Expensive</a></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="userLogged" style={this.props.isAuthorized ? {'display': 'block'} : {'display': 'none'} }>
                            <div className="loggedEmail">You logged as {email}</div>
                            <button type="button" className="btn btn-default header-btn pull-right" onClick={this.viewCart.bind(this)}>
                                <Link to="/cart/">Cart</Link>
                            </button>
                            <button type="button" className="btn btn-default header-btn pull-right">
                                <Link to="/profile/">Profile</Link>
                            </button>
                            <button onClick={this.logoutHandle.bind(this)} type="button" className="btn btn-default header-btn pull-right">
                                <Link to="/">Logout</Link>
                            </button>
                        </div>
                        <form className="navbar-form navbar-right " style={this.props.isAuthorized ? {'display': 'none'} : {'display': 'block'}}>
                            <div className="form-group form-group">
                                <input type="email" className="form-control login" placeholder="Email" ref="emailL"/>
                            </div>
                            <div className="form-group form-group">
                                <input type="password" className="form-control login" placeholder="Password" ref="passwordL"/>
                            </div>
                            <button type="button" className="btn btn-default header-btn" onClick={this.loginHandle.bind(this)}>Login</button>
                            <span className="or"> or </span>
                            <button type="button" className="btn btn-default header-btn" data-toggle="modal" data-target="#registerModal">Register</button>
                        </form>


                        <div className="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 className="modal-title" id="myModalLabel">Register form</h4>
                                        <span>Fields with mark * are required to fill</span>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="* Name" ref="name"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="* Second Name" ref="secondName"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="* Email" ref="email"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="* Password" ref="password"/>
                                        </div>
                                        <div className="form-group">
                                            <input type="date" className="form-control" placeholder="Date of your birth" ref="DOB" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn modal-btn" data-dismiss="modal">Close</button>
                                        <button  type="button"  onClick={this.signHandle.bind(this)} className="btn modal-btn" data-dismiss="modal">Sing Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="signSuccess">
                            <div>You successfully sing up!</div>
                            <div>Now you need login</div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

function mapStateToProps (state) {
    return {
        isAuthorized: state.mainPage.isAuthorized,
        cars : state.mainPage.cars
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(HeaderComponent)
