import React, { Component } from 'react';
import api from '../api/'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CartComponent extends Component {

    render() {

        let count = 0;
        let cartItems = this.props.cart.carInfo;
        if(cartItems) {
            var result = cartItems.map((i)=> {
                return (
                    <tr key={count}>
                        <th>{count++}</th>
                        <th>{i.model}</th>
                        <th>{i.make}</th>
                        <th>{i.amount}</th>
                        <th>{i.amount * i.cost} $</th>
                    </tr>
                )
            })
        }

        return (
        <div>
            <div class="cart">
                <table border="0">
                    <caption>Your cart</caption>
                    <tbody>
                        <tr style={{'marginBottom' : '20px'}}>
                            <th>№</th>
                            <th>Model</th>
                            <th>Make</th>
                            <th>Amount</th>
                            <th>Total</th>
                        </tr>
                        {result}
                    </tbody>
                </table>
            </div>
            <button class="confirm">Confirm Order</button>
        </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        cart: state.mainPage.cart
    }
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps , mapDispatchToProps)(CartComponent)