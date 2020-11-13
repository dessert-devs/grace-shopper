import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

const DELETE_ORDER = 'DELETE_ORDER'

const deleteOrder = productId => {
  return {
    type: DELETE_ORDER,
    productId
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

const initialState = [] // pendingOrder object
export default function singleOrdersReducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_ORDER:
      return state.products.filter(order => order.id !== action.productId)
    default:
      return state
  }
}
