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
      <div>
        <h1>Order History: </h1>
        <h2>
          {'Order Placed on:  ' +
            (pendingOrders.updatedAt &&
              pendingOrders.updatedAt.slice(0, 10) +
                ' ' +
                pendingOrders.updatedAt.slice(11, 19))}
        </h2>
        {pendingOrders.products &&
          pendingOrders.products.map(order => {
            console.log(order)
            return (
              <div key={order.id}>
                <img className="imgs" src={order.img} />
                <h5>Product: {order.name} </h5>
                <h5>Quantity: {order.order_product.amount} </h5>
                <h5>
                  Total Price: ${displayPrice(order.order_product.total_price)}
                </h5>
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
    getCompletedOrders: userId => dispatch(fetchCompletedOrders(userId))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
