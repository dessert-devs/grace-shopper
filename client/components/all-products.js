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

              <img src={element.img} id="img" />
              <div id="product-info">
                {this.props.match.params.user_id ? (
                  <Link
                    to={`/home/all-products/${
                      this.props.match.params.user_id
                    }/${element.id}`}
                  >
                    <h3>{element.name}</h3>
                  </Link>
                ) : (
                  <Link to={`/all-products/${element.id}`}>
                    <h3>{element.name}</h3>
                  </Link>
                )}
                <h5>${displayPrice(element.price)}</h5>

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
