import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

//Action Type

const GET_PENDING_ORDERS = 'GET_PENDING_ORDERS'
const ADD_ORDER = 'ADD_ORDER'
const DELETE_ORDER = 'DELETE_ORDER'

//Action Creator
export const getPendingOrders = pendingOrders => {
  return {
    type: GET_PENDING_ORDERS,
    pendingOrders
  }
}

//Action Creator
export const addOrderCreator = newOrder => {
  return {
    type: ADD_ORDER,
    newOrder
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
const initialState = [] //array of pendingOrder objects
export default function pendingOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PENDING_ORDERS:
      return action.pendingOrders
    case ADD_ORDER:
      return [...state, action.newOrder]
    case DELETE_ORDER:
      return state.filter(order => order.productId !== action.productId)
    default:
      return state
  }
}
