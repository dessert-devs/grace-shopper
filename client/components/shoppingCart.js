import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import SingleCartItem from './singleCartItem'
import {
  checkOutOrder,
  fetchPendingOrders,
  removeOrder
} from '../store/user_orders'
import {removeGuestOrder} from '../store/guestOrder'
import {displayPrice} from '../utilityfunc'

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
    let guest_total = 0
    let user_total = 0
    return (
      <div id="all-cart-products">
        <h1>Your Shopping Cart</h1>
        <div id="cart-list">
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
                  user_total += order.order_product.total_price
                  return (
                    <div key={order.id} className="cart-row">
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
                guest_total += order.total_price
                console.log('order: ', order)
                return (
                  <div key={order.product_id} className="cart-row">
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
        </div>
        <div className="whole-subtotal">
          {this.props.match.params.userId ? (
            <div>
              <div id="subtotal">Subtotal: ${displayPrice(user_total)}</div>
            </div>
          ) : (
            <div>
              <div id="subtotal">Subtotal: ${displayPrice(guest_total)}</div>
            </div>
          )}
          {this.props.match.params.userId ? (
            <Link
              to={{
                pathname: `/users/${
                  this.props.match.params.userId
                }/shopping-cart/confirmation`,
                state: {
                  orders: pendingOrders.products,
                  subtotal: user_total
                }
              }}
            >
              <button
                id="cart-button"
                type="submit"
                onClick={() =>
                  this.props.checkOut(this.props.match.params.userId)
                }
              >
                Check Out
              </button>
            </Link>
          ) : (
            <button
              id="cart-button"
              type="submit"
              onClick={() => alert('Please sign up or log in!')}
            >
              Check Out
            </button>
          )}
        </div>
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
