import axios from 'axios'
import thunkMiddleware from 'redux-thunk'

//Action Type
const EDIT_ORDER = 'EDIT_ORDER'

export const editOrderCreator = pendingOrder => {
  return {
    type: EDIT_ORDER,
    pendingOrder
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

//reducer
const initialState = {} //order info
export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_ORDER:
      return action.pendingOrder
    default:
      return state
  }
}
