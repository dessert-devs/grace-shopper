import React, {Component} from 'react'
import axios from 'axios'
import {displayPrice} from '../utilityfunc'

export default class Confirmation extends Component {
  render() {
    return (
      <div id="all-cart-products">
        <h1>Your order is confirmed! Thanks for shopping!</h1>
        <div id="all-cart-products-confirmation">
          <h3> Order Summary: </h3>
          <div id="cart-list">
            {this.props.location.state.orders.map(order => {
              return (
                <div key={order.id} className="cart-row-confirmation">
                  <img id="cart-img" src={order.img} />
                  <div className="cart-box">{order.name}</div>
                  <div className="cart-box">
                    Price Per Unit: ${displayPrice(order.order_product.price)}
                  </div>
                  <div className="cart-box">
                    Unit(s): {order.order_product.amount}
                  </div>
                  <div className="cart-box">
                    Total Price: $
                    {displayPrice(order.order_product.total_price)}
                  </div>
                </div>
              )
            })}
          </div>
          <h1>-------------------------</h1>
          <h3>Subtotal: ${displayPrice(this.props.location.state.subtotal)}</h3>
        </div>
        <img src="/favicon.ico" id="welcome-icon" />
      </div>
    )
  }
}
