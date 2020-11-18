import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="cart-form">
      <h1>Hi, {email}!</h1>
      <img id="welcome-icon" src="/favicon.ico" />
      <div id="welcome-text">
        Welcome to <span className="text-bold">Dev's Desserts </span> where
        we're serving up a delightful display of our favorite treats! Use the
        link above to check out our delectable desserts and enjoy!
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
