import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {removeOrder, updatePendingOrder} from '../store/user_orders'
import {updateGuestOrder} from '../store/guestOrder'
import {Link} from 'react-router-dom'
import {displayPrice, formatInput} from '../utilityfunc'

class SingleCartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.product.order_product) {
      this.setState({
        value: this.props.product.order_product.amount
      })
    } else {
      this.setState({
        value: this.props.product.amount
      })
    }
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({value: event.target.value})
  }

  handleSubmit(productId, img, price, name) {
    let amount = Number(this.state.value)
    let totalPrice = amount * price
    return event => {
      event.preventDefault()
      if (this.props.userId) {
        this.props.updateOrder(
          {amount: amount, total_price: totalPrice},
          this.props.userId,
          productId
        )
      } else {
        this.props.editGuestOrder(
          {
            amount,
            img,
            price,
            name,
            total_price: totalPrice,
            product_id: productId
          },
          productId
        )
      }
    }
  }

  render() {
    let productId = this.props.product.product_id || this.props.product.id
    return (
      <div>
        {this.props.userId ? (
          <Link to={`/home/all-products/${this.props.userId}/${productId}`}>
            <img className="imgs" src={this.props.product.img} />
          </Link>
        ) : (
          <Link to={`/all-products/${productId}`}>
            <img className="imgs" src={this.props.product.img} />
          </Link>
        )}
        <h2>{this.props.product.name}</h2>
        <h2>amount:</h2>
        <form
          onSubmit={this.handleSubmit(
            this.props.product.product_id || this.props.product.id,
            this.props.product.img,
            this.props.product.price,
            this.props.product.name
          )}
        >
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
          {this.props.product.order_product
            ? '$' +
              displayPrice(
                this.props.product.price *
                  this.props.product.order_product.amount
              )
            : '$' +
              displayPrice(
                this.props.product.price * this.props.product.amount
              )}
        </h4>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateOrder: (pendingOrder, userId, productId) =>
      dispatch(updatePendingOrder(pendingOrder, userId, productId)),
    editGuestOrder: (product, productId) =>
      dispatch(updateGuestOrder(product, productId))
  }
}

export default connect(null, mapDispatch)(SingleCartItem)
