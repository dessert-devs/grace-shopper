// import axios from 'axios'
// import history from '../history'

// action type
const GUEST_ORDER = 'GUEST_ORDER'
const GUEST_EDIT_ORDER = 'GUEST_EDIT_ORDER'
const GUEST_DELETE_ORDER = 'GUEST_DELETE_ORDER'
// const GUEST_DELETE_ORDER = 'GUEST_DELETE_ORDER'

// initial state
const defaultProduct = []

// action creator

const getGuestOrder = product => {
  return {
    type: GUEST_ORDER,
    product
  }
}

const editGuestOrder = (guestOrder, productId) => {
  return {
    type: GUEST_EDIT_ORDER,
    guestOrder,
    productId
  }
}

// Action Creator
const deleteGuestOrder = productId => {
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

//THUNK
export const updateGuestOrder = (product, productId) => {
  return dispatch => {
    dispatch(editGuestOrder(product, productId))
  }
}

//THUNK
export const removeGuestOrder = productId => {
  return dispatch => {
    dispatch(deleteGuestOrder(productId))
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GUEST_ORDER:
      return [...state, action.product]
    case GUEST_EDIT_ORDER:
      const foundProduct = state.findIndex(element => {
        return element.product_id === action.productId
      })
      const newProductState = [...state]
      newProductState.splice(foundProduct, 1, action.guestOrder)
      return newProductState
    case GUEST_DELETE_ORDER:
      return state.filter(order => order.product_id !== action.productId)
    default:
      return state
  }
}
