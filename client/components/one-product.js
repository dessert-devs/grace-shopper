import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/singleproduct.js'
import {postOrder} from '../redux/user_orders'

class OneProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let amount = Number(this.state.value)
    this.setState({amount: event.target.value})
  }

  handleSubmit(id, price) {
    // README: add route to update db with the amount variable
    let amount = Number(this.state.value)
    let total_price = price * amount
    return event => {
      event.preventDefault()
      this.props.addNewOrder({amount: amount, id, price, total_price}, 1)
    }
  }

  componentDidMount() {
    this.props.getOneProduct(this.props.match.params.productId)
  }

  render() {
    function displayPrice(num) {
      let exponent = Math.pow(10, -2)
      return num * exponent
    }

    function formatInput(e) {
      //this prevents unwanted input in add to cart field
      let checkIfNum
      if (e.key !== undefined) {
        checkIfNum =
          e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-'
      }
      return checkIfNum && e.preventDefault()
    }

    return (
      <div>
        <img src={this.props.singleproduct.img} />
        <h5>{this.props.singleproduct.name}</h5>
        <h5>${displayPrice(this.props.singleproduct.price)}</h5>
        <h5>{this.props.singleproduct.description}</h5>
        <form
          onSubmit={this.handleSubmit(
            this.props.singleproduct.id,
            this.props.singleproduct.price
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
    )
  }
}

const mapState = state => {
  return {
    singleproduct: state.singleproduct,
    pendingOrders: state.pendingOrders
  }
}

const mapDispatch = dispatch => {
  return {
    getOneProduct: id => dispatch(fetchOneProduct(id)),
    addNewOrder: (newOrder, userId) => {
      dispatch(postOrder(newOrder, userId))
    }
  }
}
//order_products: newOrder = { amount, productId, orderId, price, total_price }
//order: {id, pending, userId}

export default connect(mapState, mapDispatch)(OneProduct)

// export default OneProduct;
