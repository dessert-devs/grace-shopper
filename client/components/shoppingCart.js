import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import SingleCartItem from './singleCartItem'
import {
  checkOutOrder,
  fetchPendingOrders,
  removeOrder
} from '../redux/user_orders'
import {removeGuestOrder} from '../store/guestOrder'

class ShoppingCart extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    if (this.props.match.params.userId) {
      this.props.getPendingOrders(this.props.match.params.userId)
    }
  }

  render() {
    const {pendingOrders} = this.props
    return (
      <div>
        <h1>Here's your Shopping Cart</h1>

        {this.props.match.params.userId
          ? pendingOrders.products &&
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
                      type="submit"
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
              })
          : this.props.guestOrder.map(order => {
              console.log('order: ', order)
              return (
                <div key={order.product_id}>
                  <SingleCartItem product={order} />
                  <button
                    type="submit"
                    onClick={() =>
                      this.props.deleteGuestOrder(order.product_id)
                    }
                  >
                    Remove
                  </button>
                </div>
              )
            })}
        {this.props.match.params.userId ? (
          <Link
            to={`/users/${
              this.props.match.params.userId
            }/shopping-cart/confirmation`}
          >
            <button
              onClick={() =>
                this.props.checkOut(this.props.match.params.userId)
              }
            >
              Check Out
            </button>
          </Link>
        ) : (
          <button onClick={() => alert('Please sign up or log in!')}>
            Check Out
          </button>
        )}
      </div>
    )
  }
}

const mapState = state => {
  //console.log('shopping state map state', state)
  return {
    pendingOrders: state.pendingOrders,
    singleproduct: state.singleproduct,
    guestOrder: state.guestOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getPendingOrders: userId => dispatch(fetchPendingOrders(userId)),
    deleteOrder: (userId, productId) =>
      dispatch(removeOrder(userId, productId)),
    checkOut: userId => dispatch(checkOutOrder(userId)),
    deleteGuestOrder: productId => dispatch(removeGuestOrder(productId))
  }
}

export default connect(mapState, mapDispatch)(ShoppingCart)
