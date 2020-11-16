import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product.js'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    function displayPrice(num) {
      let exponent = Math.pow(10, -2)
      return num * exponent
    }

    return (
      <div id="all-products">
        {this.props.products.map(element => {
          return (
            <div key={element.id} id="single-product">
              <div>
                <img src={element.img} id="img" />
              </div>
              <div id="product-info">
                <Link to={`/all-products/${element.id}`}>{element.name}</Link>
                -- ${displayPrice(element.price)} --
              </div>
            </div>
          )
        })}
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
    getProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
