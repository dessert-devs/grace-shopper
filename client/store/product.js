import axios from 'axios'
// import history from '../history'

// action type
const SET_PRODUCTS = 'SET_PRODUCTS'

// initial state
const defaultProduct = []

// action creator
const setProducts = products => ({
  type: SET_PRODUCTS,
  products
})

//thunk creator
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/all-products')
      dispatch(setProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
