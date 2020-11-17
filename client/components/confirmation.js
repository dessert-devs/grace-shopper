import React, {Component} from 'react'
import axios from 'axios'
import {displayPrice} from '../utilityfunc'

export default class Confirmation extends Component {
  render() {
    return (
      <div>
        <h2>Your order is confirmed! Thanks for shopping!</h2>
        <h3> Order summary: </h3>
        <div>
          {this.props.location.state.orders.map(order => {
            return (
              <div key={order.id}>
                <img className="imgs" src={order.img} />
                <h5>{order.name}</h5>
                <h5>
                  Price per unit: ${displayPrice(order.order_product.price)}
                </h5>
                <h5>unit(s): {order.order_product.amount}</h5>
                <h5>
                  Total Price: ${displayPrice(order.order_product.total_price)}
                </h5>
              </div>
            )
          })}
        </div>
        <h1>-------------------------</h1>
        <h3>Subtotal: ${displayPrice(this.props.location.state.subtotal)}</h3>
      </div>
    )
  }
}
