import axios from 'axios'
// import history from '../history'

// action type
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'

// initial state
const defaultProduct = {product: {}, loading: true}

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

const SET_LOADING = 'SET_LOADING'
const loadingCreator = () => {
  return {
    type: SET_LOADING
  }
}
export const loadingProduct = () => {
  return async dispatch => {
    try {
      const action = loadingCreator()
      dispatch(action)
    } catch (err) {
      console.error(err.message)
    }
  }
}

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_ONE_PRODUCT:
      return {product: action.product, loading: false}
    case SET_LOADING:
      return {product: {...state.product}, loading: true}
    default:
      return state
  }
}
