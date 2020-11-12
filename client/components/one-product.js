import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/singleproduct.js'

class OneProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    // README: add route to update db with the amount variable
    let amount = Number(this.state.value)
    alert('A value was submitted: ' + amount)
    event.preventDefault()
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
        <form onSubmit={this.handleSubmit}>
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
    singleproduct: state.singleproduct
  }
}

const mapDispatch = dispatch => {
  return {
    getOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapState, mapDispatch)(OneProduct)

// export default OneProduct;
