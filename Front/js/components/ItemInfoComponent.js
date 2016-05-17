import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class ItemInfoComponent extends Component {
    render() {

        const { singleCar} = this.props;
        console.log(singleCar)
        return (
            <div className="itemDetail">
                <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                    <table border="0">
                        <caption>Car record</caption>
                        <tbody>
                        <tr>
                            <td>Make</td>
                            <td>{singleCar.make}</td>
                        </tr>
                        <tr>
                            <td>Model</td>
                            <td>{singleCar.model}</td>
                        </tr>
                        <tr>
                            <td>Color</td>
                            <td>{singleCar.color}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{singleCar.year}</td>
                        </tr>
                        <tr>
                            <td>State</td>
                            <td>{singleCar.carState}</td>
                        </tr>
                        <tr>
                            <td>Mileage</td>
                            <td>{singleCar.mileage}</td>
                        </tr>
                        <tr>
                            <td>Transmission</td>
                            <td>{singleCar.transmissionType}</td>
                        </tr>
                        <tr>
                            <td>Special price</td>
                            <td> {singleCar.cost}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="addToOrder">
                        <button className="add bth col-lg-4 col-md-4 col-sm-4 col-xs-4">Add to Order</button>
                        <input type="text" className="col-lg-3 col-md-3 col-sm-3 col-xs-3" placeholder="Amount" />
                            <a href="#" className="col-lg-3 col-md-3 col-sm-3 col-xs-3">View Top 5 Cars to rent </a>
                    </div>
                </div>
                <img src="img/car.jpg" alt="#" className="col-lg-4 col-md-4 col-sm-4 col-xs-12" />
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        singleCar : state.mainPage.singleCar
    }
}


export default connect(mapStateToProps )(ItemInfoComponent)