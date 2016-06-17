import React, { Component } from 'react';
import api from '../api/'
import * as pageActions from '../actions/index'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class CartComponent extends Component {

  componentWillMount() {
    const token = localStorage.getItem(`token`);
    const orderId = localStorage.getItem(`orderId`);
    if(orderId != null) {
      this.props.pageActions.getCart(token, orderId);
    }
  }

  changeHandle(id, costId, stockId, cost) {
    let orderId = localStorage.getItem('orderId');
    let newAmount = $('#' + id).val() || 1;
    let token = localStorage.getItem('token');
    api.changeAmount(stockId, newAmount, orderId, token, (data)=> {
      if (data) {
        newAmount === 0 ?
          $('#' + costId).text('We will phone you') :
          $('#' + costId).text(cost * newAmount + ' $')

      }
    })
  }

  deleteHandle(rowId, stockId) {
    api.deleteFromCart(stockId, (data)=> {
      if (data) {
        console.log(rowId)
        $('#' + rowId).css("display", "none")
      }
    })
  }

  confirmOrder() {
    api.confirmOrder((data)=> {
      if (data) {
        $('#confirmSuccess').css({"opacity": "1", "z-index": "100"});
        setTimeout(() => {
          $('#confirmSuccess').css({"opacity": "0", "z-index": "100"})
          window.location.replace("http://localhost:8080/");
        }, 4000)
      } else {
        alert('Nothing here')
      }
    })
  }

  render() {

    let count = 1;
    let cartItems = this.props.cart.carInfo;
    if (cartItems) {
      var result = cartItems.map((i)=> {
        return (
          <tr key={count++} id={`row${count}`}>
            <td>{i.model}</td>
            <td>{i.make}</td>
            <td ><input id={`amount${count}`}
                        type="text"
                        placeholder={i.amount}
                        style={{'width': '80px'}}/></td>
            <td id={`cost${count}`}>{i.cost > 0 ? i.amount * i.cost + '$' : 'We will phone you'}</td>
            <td>
              <button onClick={this.changeHandle.bind(this,`amount${count}`,`cost${count}`, i.stockId, i.cost)}>Change
              </button>
            </td>
            <td>
              <button onClick={this.deleteHandle.bind(this,`row${count}`, i.stockId)}>Delete</button>
            </td>
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
            <tr style={{'height' : '60px'}}>
              <th>Model</th>
              <th>Make</th>
              <th>Amount</th>
              <th>Total</th>
              <th>Change</th>
              <th>Delete</th>
            </tr>
            {result}
            </tbody>
          </table>
          <div id="confirmSuccess">
            <div>You successfully confirm the order!</div>
            <div>We will phone you as soon as possible</div>
          </div>

        </div>
        <button onClick={this.confirmOrder.bind(this)} class="confirm">Confirm Order</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.mainPage.cart
  }
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CartComponent)