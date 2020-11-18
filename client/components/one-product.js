/*eslint-disable */
// ^^^^ TAKE OUT

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct, loadingProduct} from '../store/singleproduct.js'
import {
  postOrder,
  fetchProdOrder,
  updatePendingOrder
} from '../store/user_orders.js'
import {addGuestOrder, updateGuestOrder} from '../store/guestOrder'
import {element} from 'prop-types'
import {displayPrice, formatInput} from '../utilityfunc'
import Loader from 'react-loader-spinner'

class OneProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(product_id, userId, price, name, img) {
    if (this.state.value !== '') {
      let amount = Number(this.state.value)
      let total_price = price * amount
      return async event => {
        event.preventDefault()
        if (userId) {
          await this.props.checkProdExists(userId, product_id)
          if (this.props.foundProd) {
            let orig_amount = this.props.foundProd.products[0].order_product
              .amount
            this.props.updateOrder(
              {
                amount: amount + orig_amount,
                total_price: (amount + orig_amount) * price
              },
              userId,
              product_id
            )
          } else {
            this.props.addShoppingCart(
              {amount, price, total_price, product_id},
              userId
            )
          }
        } else {
          if (
            this.props.guestOrder
              .map(elm => {
                return elm.product_id
              })
              .includes(product_id)
          ) {
            let orig_guest_amount = this.props.guestOrder.filter(
              elm => elm.product_id === product_id
            )[0].amount
            console.log('original_guest_amount: ', orig_guest_amount)
            let updated_amount = orig_guest_amount + amount
            console.log('updated amount: ', updated_amount)

            let updated_total_price = updated_amount * price
            this.props.editGuestOrder(
              {
                amount: updated_amount,
                product_id,
                price,
                name,
                total_price: updated_total_price,
                img
              },
              product_id
            )
          } else {
            this.props.postGuestOrder({
              product_id,
              price,
              name,
              amount,
              total_price,
              img
            })
          }
        }

        //README: error?
        let x = document.getElementById('snackbar')
        x.className = 'show'
        setTimeout(function() {
          x.className = x.className.replace('show', '')
        }, 3000)
      }
    } else {
      return async event => {
        event.preventDefault()
        alert('Please select a quantity')
      }
    }
  }

  componentDidMount() {
    this.props.getOneProduct(this.props.match.params.productId)
    // console.log('comp mount:', this.props)
  }

  componentWillUnmount() {
    this.props.changeLoadingState()
  }

  render() {
    const {loading} = this.props
    if (loading) {
      return (
        <div>
          <Loader type="Rings" color="#00BFFF" height={80} width={80} />
        </div>
      )
    }
    return (
      <div className="one-product">
        <img id="img" src={this.props.singleproduct.img} />
        <div className="one-product-info">
          <div className="one-product-text text-bold">
            {this.props.singleproduct.name}
          </div>
          <div className="one-product-text">
            ${displayPrice(this.props.singleproduct.price)}
          </div>
          <div className="one-product-text text-small">
            {this.props.singleproduct.description}
          </div>
          <form
            onSubmit={this.handleSubmit(
              this.props.singleproduct.id,
              this.props.match.params.user_id,
              this.props.singleproduct.price,
              this.props.singleproduct.name,
              this.props.singleproduct.img
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
            <input type="submit" value="Add To Cart" />
          </form>
        </div>
        <div id="snackbar">
          Added {this.state.value} of these treats to your cart!
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleproduct: state.singleproduct.product,
    loading: state.singleproduct.loading,
    foundProd: state.pendingOrders,
    guestOrder: state.guestOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOneProduct: id => dispatch(fetchOneProduct(id)),
    addShoppingCart: (newOrder, userId) =>
      dispatch(postOrder(newOrder, userId)),
    checkProdExists: (userId, productId) =>
      dispatch(fetchProdOrder(userId, productId)),
    updateOrder: (pendingOrder, userId, productId) =>
      dispatch(updatePendingOrder(pendingOrder, userId, productId)),
    postGuestOrder: product => dispatch(addGuestOrder(product)),
    editGuestOrder: (product, productId) =>
      dispatch(updateGuestOrder(product, productId)),
    changeLoadingState: () => dispatch(loadingProduct())
  }
}

export default connect(mapState, mapDispatch)(OneProduct)
