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
    if (this.state.value !== '') {
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
    } else {
      return event => {
        event.preventDefault()
        alert('Please select a quantity')
      }
    }
  }

  render() {
    let productId = this.props.product.product_id || this.props.product.id

    return (
      <div id="single-cart-product">
        <div className="cart-box">
          {this.props.userId ? (
            <Link to={`/home/all-products/${this.props.userId}/${productId}`}>
              <img src={this.props.product.img} id="cart-img" />
            </Link>
          ) : (
            <Link to={`/all-products/${productId}`}>
              <img src={this.props.product.img} id="cart-img" />
            </Link>
          )}
        </div>
        {/* <div id="cart-single-info"> */}
        <div className="cart-box">
          <div />
          {this.props.product.name}
        </div>
        <div className="cart-box">
          {/* <div>amount:</div> */}
          <form
            className="cart-form"
            onSubmit={this.handleSubmit(
              this.props.product.product_id || this.props.product.id,
              this.props.product.img,
              this.props.product.price,
              this.props.product.name
            )}
          >
            {/* <label> */}
            amount:
            <input
              type="number"
              min="1"
              onKeyDown={evt => {
                formatInput(evt)
              }}
              value={this.state.value}
              onChange={this.handleChange}
            />
            {/* </label> */}
            <input type="submit" value="Update" />
          </form>
        </div>
        <div className="cart-box">
          <div>price:</div>
          <div>${displayPrice(this.props.product.price)}</div>
        </div>
        <div className="cart-box">
          <div>total:</div>
          <div>
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
          </div>
        </div>
        {/* </div> */}
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
