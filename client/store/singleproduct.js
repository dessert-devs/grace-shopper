import axios from 'axios'
// import history from '../history'

// action type
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'

// initial state
const defaultProduct = []

// action creator

const getOneProduct = product => ({
  type: GET_ONE_PRODUCT,
  product
})

//thunk creator

export const fetchOneProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/all-products/${id}`)
      dispatch(getOneProduct(data))
    } catch (err) {
      console.log(err)
    }
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return action.product
    default:
      return state
  }
}
