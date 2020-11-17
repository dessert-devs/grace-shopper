import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product.js'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // function displayPrice(num) {
    //   let exponent = Math.pow(10, -2)
    //   return num * exponent
    // }

    function displayPrice(num) {
      let exponent = Math.pow(10, -2)
      let answer = num * exponent
      return answer.toFixed(2)
    }

    return (
      <div id="all-products">
        {this.props.products.map(element => {
          return (
            <div key={element.id} id="single-product">
              {this.props.match.params.user_id ? (
                <Link
                  to={`/home/all-products/${this.props.match.params.user_id}/${
                    element.id
                  }`}
                >
                  <img src={element.img} id="img" />
                  <div id="product-info">{element.name}</div>
                </Link>
              ) : (
                <Link to={`/all-products/${element.id}`}>
                  <img src={element.img} id="img" />
                  <div id="product-info">{element.name}</div>
                </Link>
              )}
              <div id="product-info">--${displayPrice(element.price)}--</div>
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
