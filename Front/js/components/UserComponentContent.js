import React, { Component } from 'react';

class UserComponentContent extends Component {
    render() {
        return (
            <div>
                <div id="default" style={this.props.actionName === '' ? {'display' : 'block'} : {'display' : 'none'}}>
                    DEFAULT
                </div>
                <div id="add" style={this.props.actionName === 'add' ? {'display' : 'block'} : {'display' : 'none'}}>
                    <h3>Here you can add you own car</h3>
                    <form>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Make" ref="Make"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Model" ref="Model"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Color" ref="Color"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Year" ref="Year"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Mileage" ref="Year"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Transmission" ref="Transmission"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="EntryDate" ref="EntryDate"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="Cost in $" ref="Cost"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control login" placeholder="DealerId" ref="DealerId"/>
                        </div>
                        <button type="button" className="btn btn-default header-btn" >Add my Car</button>
                    </form>
                </div>
                <div id="delete" style={this.props.actionName === 'delete' ? {'display' : 'block'} : {'display' : 'none'}}>
                    DELETE
                </div>
                <div id="update" style={this.props.actionName === 'update' ? {'display' : 'block'} : {'display' : 'none'}}>
                    Update
                </div>
                <div id="view" style={this.props.actionName === 'view' ? {'display' : 'block'} : {'display' : 'none'}}>
                    VIEW
                </div>
            </div>
        );
    }
}

export default UserComponentContent;
