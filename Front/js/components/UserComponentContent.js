import React, { Component } from 'react';
import  api from '../api/'
import * as pageActions from '../actions/index'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class UserComponentContent extends Component {

    newCarDataHandle() {
        let newCar = {};
        let carsProperty = Object.keys(this.refs);
        carsProperty.forEach((i)=> {
            newCar[i] = this.refs[i].value;
        });
        api.addCar(newCar, (data) =>  {
            if(data) {
                localStorage.setItem('token', data)
                $('#addCarSuccess').css({"opacity":"1","z-index" :"100"});
                setTimeout(() => {
                    $('#addCarSuccess').css({"opacity":"0","z-index" :"100"})
                },2000)
            }

        })
    }

    setCar(id) {
        this.props.pageActions.getSingle(id)
    }

    deleteCar() {
        let stockId = this.refs.deleteId.value;
        api.deleteOwnCar(stockId, (answer) => {
            if(answer) {
                $('#deleteCarSuccess').css({"opacity":"1","z-index" :"100"});
                setTimeout(() => {
                    $('#deleteCarSuccess').css({"opacity":"0","z-index" :"100"})
                },2000)
                this.refs.deleteId.value = ''
            }
        })

    }

    updateCar() {
        let stockId = this.refs.updateId.value;
        let field = this.refs.updateField.value;
        let value = this.refs.updateValue.value;
        let property = {};

        property[field] = value;
        api.updateOwnCar(stockId,property, (answer) => {
            if(answer) {
                $('#updateCarSuccess').css({"opacity":"1","z-index" :"100"});
                setTimeout(() => {
                    $('#updateCarSuccess').css({"opacity":"0","z-index" :"100"})
                },2000)
            }
        })

    }

    render() {

        if(this.props.ownCars.length > 0) {
            var ownCars = this.props.ownCars.map((i) => {
                return(
                <tr key={i.stockId}>
                    <th>{i.stockId}</th>
                    <th>{i.carState}</th>
                    <th>{i.createdAt}</th>
                    <th>{i.bought}</th>
                    <th><Link to={`/cars/${i._id}`} onClick={this.setCar.bind(this, i._id)}>Link</Link></th>
                </tr>
                )
            })
        }


        return (
            <div>
                <div id="default" style={this.props.actionName === '' ? {'display' : 'block'} : {'display' : 'none'}}>
                    <h1 style={{'textAlign' : 'center', 'marginBottom' : '20px'}}>Here you can do some stuff</h1>
                    <h3 style={{'textAlign' : 'center'}}>Choose one of the above</h3>
                </div>
                <div id="add" style={this.props.actionName === 'add' ? {'display' : 'block'} : {'display' : 'none'}}>
                    <h3>Here you can add you own car</h3>
                    <form>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="make" ref="make"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="model" ref="model"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="stockId" ref="stockId"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="VINCode" ref="VINCode"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="color" ref="color"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="mileage" ref="mileage"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="year" ref="year"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="entryDate" ref="entryDate"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="cost in $" ref="cost"/>
                        </div>
                        <div className="form-group form-group">
                            <input type="text" className="form-control " placeholder="dealerId" ref="dealerId"/>
                        </div>
                        <div className="form-group form-group" style={{'width': '100%' }}>
                            <p style={{'marginRight' :'20px'}}>Select car availability</p>
                            <select ref="carAvailability">
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="form-group form-group" style={{'width': '100%' }}>
                            <p  style={{'marginRight' :'20px'}}>Select car state</p>
                            <select ref="carState">
                                <option value="New">New</option>
                                <option value="Used">Used</option>
                            </select>
                        </div>
                        <div className="form-group form-group" style={{'width': '100%' }}>
                            <p  style={{'marginRight' :'20px'}}>Select car transmission type</p>
                            <select ref="transmissionType">
                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>
                            </select>
                        </div>
                        <button  onClick={this.newCarDataHandle.bind(this)} type="button" className="itemButtons"  style={{'marginTop' : '20px', 'width' : '20%'}}>Add my Car</button>
                    </form>
                    <div id="addCarSuccess">
                        <div>You successfully add a car!</div>
                    </div>
                </div>
                <div id="delete" style={this.props.actionName === 'delete' ? {'display' : 'block'} : {'display' : 'none'}}>
                    <div>
                            <h3 style={{'textAlign' : 'center', 'marginBottom' : '20px'}}>You can see the list of the cars stockId by clicking 'View All'</h3>
                            <h4 style={{'textAlign' : 'center','marginBottom' : '20px'}}>Please,enter stockId in the from below</h4>
                            <input style={{'marginBottom' : '20px'}} type="text" className="form-control " placeholder="Car stock Id" ref="deleteId"/>
                            <button className="itemButtons" style={{'marginBottom' : '20px'}} onClick={this.deleteCar.bind(this)}>Delete it</button>
                            <div id="deleteCarSuccess">
                                <div>You successfully delete the car!</div>
                            </div>
                    </div>
                </div>
                <div id="update" style={this.props.actionName === 'update' ? {'display' : 'block'} : {'display' : 'none'}}>
                    <div>
                        <h3 style={{'textAlign' : 'center', 'marginBottom' : '20px'}}>You can see the list of the cars stockId by clicking 'View All'</h3>
                        <h4 style={{'textAlign' : 'center','marginBottom' : '20px'}}>Please,enter stockId in the from below</h4>
                        <input style={{'marginBottom' : '20px'}} type="text" className="form-control " placeholder="Car stock Id" ref="updateId"/>
                        <input style={{'marginBottom' : '20px'}} type="text" className="form-control " placeholder="Feild" ref="updateField"/>
                        <input style={{'marginBottom' : '20px'}} type="text" className="form-control " placeholder="Value of a new field" ref="updateValue"/>
                        <button className="itemButtons" style={{'marginBottom' : '20px'}} onClick={this.updateCar.bind(this)}>Update it</button>
                        <div id="updateCarSuccess">
                            <div>You successfully update the car!</div>
                        </div>
                    </div>
                </div>
                <div id="view"  style={this.props.actionName === 'view' ? {'display' : 'block'} : {'display' : 'none'}}>
                        <div>
                            <table>
                                <tbody>
                                <tr style={{'height' : '50px'}}>
                                    <th>StockId</th>
                                    <th>CarState</th>
                                    <th>Created</th>
                                    <th>Bought</th>
                                    <th>More detail</th>
                                </tr>
                                {ownCars}
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        cars: state.mainPage
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(UserComponentContent)
