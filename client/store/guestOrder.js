// import axios from 'axios'
// import history from '../history'

// action type
const GUEST_ORDER = 'GUEST_ORDER'
const GUEST_EDIT_ORDER = 'GUEST_EDIT_ORDER'
const GUEST_DELETE_ORDER = 'GUEST_DELETE_ORDER'

// initial state
const defaultProduct = []

// action creator

const getGuestOrder = product => {
  return {
    type: GUEST_ORDER,
    product
  }
}

const editOrderCreator = pendingOrder => {
  return {
    type: GUEST_EDIT_ORDER,
    pendingOrder
  }
}

// Action Creator
const deleteOrder = productId => {
  return {
    type: GUEST_DELETE_ORDER,
    productId
  }
}

//thunk creator

export const addGuestOrder = product => {
  return dispatch => {
    dispatch(getGuestOrder(product))
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GUEST_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}
