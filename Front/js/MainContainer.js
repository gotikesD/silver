import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent'
import SidebarComponent from './components/SidebarComponent'
import FooterComponent from './components/FooterComponent'


class MainContainer extends Component {
    render() {
        return (
            <div className="container">
                <HeaderComponent />
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

export default MainContainer;