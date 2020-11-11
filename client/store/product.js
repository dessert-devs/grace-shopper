import axios from 'axios'
import history from '../history'

// action type
const GET_PRODUCT = 'GET_PRODUCT'

// initial state
const defaultProduct = {}

// action creator
const getProduct = product => ({
  type: GET_PRODUCT,
  product
})

//thunk creator
export const product = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('api/all-products')
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
