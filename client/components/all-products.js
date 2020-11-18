import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product.js'
import {Link} from 'react-router-dom'
import {displayPrice} from '../utilityfunc'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      filter: 'All'
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  handleSelectChange(evt) {
    this.setState({filter: evt.target.value})
  }

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {filter} = this.state
    const products = this.props.products.filter(prod => {
      if (filter === 'All') return prod
      if (filter === 'Cookies') return prod.category === 'cookie'
      if (filter === 'Cakes') return prod.category === 'cake'
      if (filter === 'Pastries') return prod.category === 'pastry'
      if (filter === 'Cupcakes') return prod.category === 'cupcake'
      if (filter === 'Seasonal') return prod.category === 'seasonal'
      if (filter === 'Strawberries') return prod.category === 'strawberry'
    })
    return (
      <div id="all-products">
        <div>
          <label htmlFor="categoryFilter">Filter by category: </label>
          <select
            onChange={this.handleSelectChange}
            value={filter}
            name="categoryFilter"
          >
            <option>All</option>
            <option>Cookies</option>
            <option>Cakes</option>
            <option>Pastries</option>
            <option>Cupcakes</option>
            <option>Seasonal</option>
            <option>Strawberries</option>
          </select>
        </div>

        {products.map(element => {
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
                    {element.name}
                  </Link>
                ) : (
                  <Link to={`/all-products/${element.id}`}>{element.name}</Link>
                )}
                --${displayPrice(element.price)}--
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
