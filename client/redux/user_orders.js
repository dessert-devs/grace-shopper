import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

//Action Type

const GET_PENDING_ORDERS = 'GET_PENDING_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

//Action Creator
export const getPendingOrders = pendingOrders => {
  return {
    type: GET_PENDING_ORDERS,
    pendingOrders //object
  }
}

//Action Creator
export const addOrderCreator = newOrder => {
  return {
    type: ADD_ORDER,
    newOrder
  }
}

export const editOrderCreator = pendingOrder => {
  return {
    type: EDIT_ORDER,
    pendingOrder
  }
}

//Action Creator
export const deleteOrder = productId => {
  return {
    type: DELETE_ORDER,
    productId
  }
}

//THUNK
export const fetchPendingOrders = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/:${userId}/pending-order`)
      dispatch(getPendingOrders(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK
export const postOrder = (newOrder, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/users/:${userId}/pending-order`,
        newOrder
      )
      dispatch(addOrderCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK
export const updatePendingOrder = (pendingOrder, userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/users/:${userId}/pending-order/${productId}`,
        pendingOrder
      )
      dispatch(editOrderCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//THUNK
export const removeOrder = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/users/:${userId}/pending-order/${productId}`
      )
      dispatch(deleteOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
const initialState = {} // pendingOrder object
export default function pendingOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PENDING_ORDERS:
      return action.pendingOrders
    case ADD_ORDER:
      return {...state, products: [...state.products, action.newOrder]}
    case EDIT_ORDER:
      return {
        ...state,
        products: [
          ...state.products.filter(order => order.id !== action.productId),
          action.pendingOrder
        ]
      }
    case DELETE_ORDER:
      return {
        ...state,
        products: state.products.filter(order => order.id !== action.productId)
      }
    default:
      return state
  }
}
