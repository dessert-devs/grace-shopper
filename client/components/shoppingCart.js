import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import SingleCartItem from './singleCartItem'

import {fetchPendingOrders, removeOrder} from '../redux/user_orders'

class ShoppingCart extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getPendingOrders(this.props.match.params.userId)
  }

  render() {
    const {pendingOrders} = this.props
    return (
      <div>
        <h1>Here's your Shopping Cart</h1>
        {pendingOrders.products &&
          pendingOrders.products
            .sort((a, b) => {
              if (a.id < b.id) {
                return -1
              }
              if (a.id > b.id) {
                return 1
              }
              return 0
            })
            .map(order => {
              return (
                <div key={order.id}>
                  <SingleCartItem
                    userId={this.props.match.params.userId}
                    product={order}
                  />
                  <button
                    onClick={() =>
                      this.props.deleteOrder(
                        this.props.match.params.userId,
                        order.id
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            })}
      </div>
    )
  }
}

const mapState = state => {
  console.log(state)
  return {
    pendingOrders: state.pendingOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getPendingOrders: userId => dispatch(fetchPendingOrders(userId)),
    deleteOrder: (userId, productId) => dispatch(removeOrder(userId, productId))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
