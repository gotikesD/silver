import React, { Component } from 'react';
import * as pageActions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class TopCarsComponent extends Component {

    render() {
        const { topCars } = this.props.cars;
        let top = topCars.map((i)=> {
           return(
               <div key={i._id} style={{'marginBottom' : '20px'}}>
                   <div>
                       <span>Make - </span>
                       <span>{i.make}</span>
                   </div>
                   <div>
                       <span>Model - </span>
                       <span>{i.model}</span>
                   </div>
                   <div>
                       <span>Bought - </span>
                       <span>{i.bought}</span>
                   </div>
               </div>
           )
        });
        return (
            <div>
                <div>{top}</div>
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        cars : state.mainPage
    }
}


function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(TopCarsComponent)