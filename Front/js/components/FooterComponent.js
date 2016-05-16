import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <footer>
                <div className="footer-log col-lg-1 col-md-1 col-sm-1 hidden-xs" >
                    <a className="navbar-brand logo" href="#">Brand</a>
                </div>
                <div className="silver-rights col-lg-6 col-md-6 col-sm-6 col-xs-5">
                    <span>Silver Cars company</span>
                    <span>All right reserver &copy;</span>
                </div>
                <div className="footer-sprites col-lg-5 col-md-5 col-sm-5 col-xs-7">
                    <h5> Follow us on</h5>
                    <ul>
                        <li><a href="" className="facebook">facebook</a></li>
                        <li><a href="" className="dribble">dribble</a></li>
                        <li><a href="" className="printerest">printerest</a></li>
                        <li><a href="" className="linkedin">linkedi</a></li>
                        <li><a href="" className="skype">skype</a></li>
                        <li><a href="" className="share">share</a></li>
                    </ul>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;