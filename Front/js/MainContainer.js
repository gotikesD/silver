import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import FooterComponent from './components/FooterComponent'
import * as pageActions from './actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


class MainContainer extends Component {
    render() {

        const { getTop } = this.props.pageActions
        return (
            <div className="container">
                <HeaderComponent getTop={getTop} />
                <main>
                    <SidebarComponent />
                    <div className="content col-lg-9 col-md-9 col-sm-9 col-xs-11">
                        {this.props.children}
                    </div>
                </main>
                <FooterComponent />
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(  mapDispatchToProps)(MainContainer)