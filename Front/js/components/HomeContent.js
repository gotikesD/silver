import React, { Component } from 'react';
import * as pageActions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router';


class HomeContent extends Component {

    componentWillMount() {
        this.props.pageActions.getAllCars()
    }

    own(id) {
        this.props.pageActions.getSingle(id)
    }

    render() {

        const { cars } = this.props;
        let carsFromDB = cars.cars.map((i)=> {
            return (
            <div key={i._id +1} className="item col-lg-3 col-md-3 col-sm-4 col-xs-6" >
                <img src="img/car.jpg" alt="#"/>
                <div className="item-info">
                    <div>
                        <span>MODEL</span>
                        <span>{i.model ? i.model : 'Call manufacter'}</span>
                    </div>
                    <div>
                        <span>Colour</span>
                        <span>{i.color ? i.color : 'Call manufacter'}</span>
                    </div>
                    <div>
                        <span>PRICE</span>
                        <span>{i.cost  ? i.cost + ' $': 'Call manufacter'}</span>
                    </div>
                    <Link onClick={this.own.bind(this, i._id)} to={`/cars/${i._id}/`}>More detail</Link>
                </div>
            </div>
            )
        });

        return (
            <div>
                {carsFromDB}
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


export default connect(mapStateToProps , mapDispatchToProps)(HomeContent)