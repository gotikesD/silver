import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
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
                            <li className="active"><a href="#">Main <span className="sr-only">(current)</span></a></li>
                            <li><a href="#">Top Cars</a></li>
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
                        <form className="navbar-form navbar-right ">
                            <div className="form-group form-group">
                                <input type="email" className="form-control login" placeholder="Email" />
                            </div>
                            <div className="form-group form-group">
                                <input type="password" className="form-control login" placeholder="Password" />
                            </div>
                            <button type="submit" className="btn btn-default header-btn">Login</button>
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
                                            <input type="text" className="form-control" placeholder="* Name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" placeholder="* Second Name" />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control" placeholder="* Email" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" placeholder="* Password" />
                                        </div>
                                        <div className="form-group">
                                            <input type="date" className="form-control" placeholder="Date of your birth" />
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn modal-btn" data-dismiss="modal">Close</button>
                                        <button type="submit" className="btn modal-btn" data-dismiss="modal">Sing Up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }
}

export default HeaderComponent;

