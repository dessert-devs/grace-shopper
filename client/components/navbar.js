import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, user_id}) => (
  <div className="pattern-2">
    <nav>
      {isLoggedIn ? (
        <div id="navbar">
          <div className="title">
            DEV'S DESSERTS
            <img id="title-icon" src="/favicon.ico" />
          </div>
          <div id="navbar-links">
            <img id="title-icon" src="/favicon.ico" />
            {/* The navbar will show these links after you log in */}
            <Link to={`/home/all-products/${user_id}`}>Home</Link>
            <img id="title-icon" src="/favicon.ico" />
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <img id="title-icon" src="/favicon.ico" />
            <Link to={`/users/${user_id}/shopping-cart`}>Shopping Cart</Link>
            <img id="title-icon" src="/favicon.ico" />
          </div>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <div className="title">
            DEV'S DESSERTS
            <img id="title-icon" src="/favicon.ico" />
          </div>
          <div id="navbar-links">
            <img id="title-icon" src="/favicon.ico" />
            <Link to="/all-products">Home</Link>
            <img id="title-icon" src="/favicon.ico" />
            <Link to="/shopping-cart">Shopping Cart</Link>
            <img id="title-icon" src="/favicon.ico" />
            <Link to="/login">Login</Link>
            <img id="title-icon" src="/favicon.ico" />
            <Link to="/signup">Sign Up</Link>
            <img id="title-icon" src="/favicon.ico" />
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user_id: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
