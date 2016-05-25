import React, { Component } from 'react';
import * as pageActions from './actions/index'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class MainContainer extends Component {

  render() {
    return (
      <div className="container">
        <HeaderComponent/>
        <main>
          <div className="content col-lg-12 col-md-12 col-sm-12 col-xs-12">
            {this.props.children}
          </div>
        </main>
        <FooterComponent />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cars : state.mainPage,
    user : state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions : bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)