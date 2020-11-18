import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, AllProducts, OneProduct} from './components'
import {me} from './store'
import ShoppingCart from './components/shoppingCart'
import Confirmation from './components/confirmation'
import orderHistory from './components/orderHistory'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, user_id} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllProducts} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/all-products" component={AllProducts} />
        <Route exact path="/all-products/:productId" component={OneProduct} />
        <Route exact path="/shopping-cart" component={ShoppingCart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route
              exact
              path="/home/all-products/:user_id"
              component={AllProducts}
            />
            <Route
              exact
              path="/home/all-products/:user_id/:productId"
              component={OneProduct}
            />
            <Route
              exact
              path="/users/:userId/shopping-cart"
              component={ShoppingCart}
            />
            <Route
              exact
              path="/users/:userId/shopping-cart/confirmation"
              component={Confirmation}
            />
            <Route
              exact
              path="/users/:userId/order-history"
              component={orderHistory}
            />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user_id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
