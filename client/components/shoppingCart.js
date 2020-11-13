import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {
  fetchPendingOrders,
  removeOrder,
  updatePendingOrder
} from '../redux/user_orders'
// import {removeOrder, updatePendingOrder} from '../redux/single_user_order'

class ShoppingCart extends Component {
  constructor() {
    super()
    this.state = {
      value: -1
    }
    // this.state= {
    //   products: []
    // }
    this.delete = this.delete.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.getPendingOrders(this.props.match.params.userId)
  }

  delete(userId, productId) {
    console.log('in handle delete!')
    console.log('userid here: ', userId)
    console.log(' prod id here: ', productId)

    // alert('here is productid and USERID: '+productId+userId)
    this.props.deleteOrder(userId, productId)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value})
  }

  // handleSubmit (text) {
  //   return event => {
  //     event.preventDefault()
  //     console.log(text)
  //   }
  // }

  handleSubmit(productId) {
    let amount = Number(this.state.value)
    return event => {
      event.preventDefault()
      this.props.updateOrder(
        {amount: amount},
        this.props.match.params.userId,
        productId
      )
    }
  }

  render() {
    console.log(this.state)
    const {pendingOrders} = this.props
    function formatInput(e) {
      //this prevents unwanted input in add to cart field
      let checkIfNum
      if (e.key !== undefined) {
        checkIfNum =
          e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-'
      }
      return checkIfNum && e.preventDefault()
    }

    // const {products} = this.props
    return (
      <div>
        <h1>Here's your Shopping Cart</h1>
        {console.log('original object: ', pendingOrders)}
        {pendingOrders.products &&
          // products &&
          pendingOrders.products.map(order => {
            return (
              <div key={order.id}>
                <img className="imgs" src={order.imageUrl} />
                <h2>{order.name}</h2>
                <h2>amount:</h2>
                <form onSubmit={this.handleSubmit(order.id)}>
                  <label>
                    <input
                      type="number"
                      min="1"
                      onKeyDown={evt => {
                        formatInput(evt)
                      }}
                      value={
                        this.state.value === -1
                          ? order.order_product.amount
                          : this.state.value
                      }
                      onChange={this.handleChange}
                    />
                  </label>
                  <input type="submit" value="Update" />
                </form>

                <h2>price:</h2>
                <h4>{order.order_product.price_per_item}</h4>
                {console.log('order here: ', order)}
                <h2>total:</h2>
                <h4>{order.order_product.total_price}</h4>
                <button
                  type="submit"
                  onClick={() =>
                    this.delete(this.props.match.params.userId, order.id)
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
  console.log(state)
  return {
    pendingOrders: state.pendingOrders
    // products: state.pendingOrders.products
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
