import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import {removeOrder, updatePendingOrder} from '../redux/user_orders'

class SingleCartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: this.props.product.order_product.amount
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value})
  }

  handleSubmit(productId) {
    let amount = Number(this.state.value)
    return event => {
      event.preventDefault()
      this.props.updateOrder({amount: amount}, this.props.userId, productId)
    }
  }

  render() {
    function displayPrice(num) {
      let exponent = Math.pow(10, -2)
      return num * exponent
    }
    function formatInput(e) {
      let checkIfNum
      if (e.key !== undefined) {
        checkIfNum =
          e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-'
      }
      return checkIfNum && e.preventDefault()
    }

    function find(e) {
      let checkIfNum
      if (e.key !== undefined) {
        checkIfNum =
          e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-'
      }
      return checkIfNum && e.preventDefault()
    }
    return (
      <div>
        <img className="imgs" src={this.props.product.img} />
        <h2>{this.props.product.name}</h2>
        <h2>amount:</h2>
        <form onSubmit={this.handleSubmit(this.props.product.id)}>
          <label>
            <input
              type="number"
              min="1"
              onKeyDown={evt => {
                formatInput(evt)
              }}
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Update" />
        </form>

        <h2>price:</h2>
        <h4>${displayPrice(this.props.product.price)}</h4>
        <h2>total:</h2>
        <h4>
          ${displayPrice(
            this.props.product.price * this.props.product.order_product.amount
          )}
        </h4>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateOrder: (pendingOrder, userId, productId) =>
      dispatch(updatePendingOrder(pendingOrder, userId, productId))
  }
}

export default connect(null, mapDispatch)(SingleCartItem)
