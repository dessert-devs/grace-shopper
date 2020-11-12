import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/product.js'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log('props->>', this.props.products)
    return <div>put the singular product component!</div>
  }
}

const mapState = state => {
  console.log('state', state)
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
