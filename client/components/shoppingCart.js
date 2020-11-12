import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {
  removeOrder,
  fetchPendingOrders,
  updatePendingOrder
} from '../redux/user_orders'

class ShoppingCart extends Component {
  //   constructor() {
  //     super();
  //   }

  componentDidMount() {
    this.props.getPendingOrders()
  }
  //   handleSubmit(event) {
  //     event.preventDefault();
  //     const newCampus = event.target.campusName.value;
  //     const newCampusAddress = event.target.campusAddress.value;

  //     this.props.submitCampus({
  //       name: newCampus,
  //       address: newCampusAddress,
  //     });
  //   }

  render() {
    const {pendingOrders} = this.props
    return (
      <div>
        <h1>Here's your Shopping Cart</h1>
        {pendingOrders.products.map(order => {
          return (
            <div key={order.id}>
              <h2>{order.name}</h2>
              <h2>{order.order_product.amount}</h2>
              <h2>{order.order_product.price}</h2>
              <h2>{order.order_product.totalPrice}</h2>
              <img src={order.imageUrl} />

              <button id="update" type="submit">
                UPDATE
              </button>
              <button
                id="remove"
                type="submit"
                onClick={() =>
                  this.deleteOrder(`${order.id}`, `${pendingOrders.userId}`)
                }
              >
                REMOVE
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => {
  return {
    pendingOrders: state.pendingOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getPendingOrders: userId => dispatch(fetchPendingOrders(userId)),
    deleteOrder: (userId, productId) =>
      dispatch(removeOrder(userId, productId)),
    updateOrder: (pendingOrder, userId, productId) =>
      dispatch(updatePendingOrder(pendingOrder, userId, productId))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
