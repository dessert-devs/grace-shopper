import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOneProduct} from '../store/product.js'

class OneProduct extends Component {
  componentDidMount() {
    this.props.getOneProduct(this.props.match.params.productId)
  }

  render() {
    return (
      <div>
        one product!
        {/* <img src={this.props.products.img} />
        <a
          href={`/all-products/${this.props.products.id}`}
          key={this.props.products.id}
        >
          <h3></h3>
        </a>
        <h5></h5>
        <small></small> */}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products
  }
}

const mapDispatch = dispatch => {
  return {
    getOneProduct: id => dispatch(fetchOneProduct(id))
  }
}

export default connect(mapState, mapDispatch)(OneProduct)

// export default OneProduct;
