import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const DELETE_ORDER = 'DELETE_ORDER'
const EDIT_ORDER = 'EDIT_ORDER'

const deleteOrder = productId => {
  return {
    type: DELETE_ORDER,
    productId
  }
}

const editOrderCreator = pendingOrder => {
  return {
    type: EDIT_ORDER,
    pendingOrder
  }
}

export const removeOrder = (userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/users/${userId}/pending-order/${productId}`
      )
      dispatch(deleteOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updatePendingOrder = (pendingOrder, userId, productId) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/users/${userId}/pending-order/${productId}`,
        pendingOrder
      )
      dispatch(editOrderCreator(data))
    } catch (error) {
      console.log(error)
    }
  }
}

const initialState = [] // pendingOrder object
export default function singleOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ORDER:
      return state.filter(order => order.id !== action.productId)
    case EDIT_ORDER: {
      // const newarr = state.filter(order=>order.id !== action.productId)
      // return [...newarr,action.pendingOrder]
      const foundOrder = state.findIndex(element => {
        return element.id === action.productId
      })
      const newOrder = [...state]
      newOrder.splice(foundOrder, 1, action.productId)
      return newOrder
    }
    default:
      return state
  }
}
