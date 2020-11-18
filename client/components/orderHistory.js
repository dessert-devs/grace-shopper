import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchCompletedOrders} from '../store/user_orders'
import {displayPrice} from '../utilityfunc'

class OrderHistory extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    this.props.getCompletedOrders(this.props.match.params.userId)
  }

  render() {
    const {pendingOrders} = this.props

    return (
      <div id="all-cart-products">
        <h1>Order History:</h1>
        <div id="all-cart-products-confirmation">
          <h3>
            {'Order Placed on:  ' +
              (pendingOrders.updatedAt &&
                pendingOrders.updatedAt.slice(0, 10) +
                  ' ' +
                  pendingOrders.updatedAt.slice(11, 19))}
          </h3>
          {pendingOrders.products &&
            pendingOrders.products.map(order => {
              console.log(order)
              return (
                <div key={order.id} className="cart-row-confirmation">
                  <img id="cart-img" src={order.img} />
                  <div className="cart-box">{order.name} </div>
                  <div className="cart-box">
                    Quantity: {order.order_product.amount}{' '}
                  </div>
                  <div className="cart-box">
                    Total Price: $
                    {displayPrice(order.order_product.total_price)}
                  </div>
                </div>
              )
            })}
        </div>
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
    getCompletedOrders: userId => dispatch(fetchCompletedOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
