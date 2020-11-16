import axios from 'axios'
// import history from '../history'

// action type
const GUEST_ORDER = 'GUEST_ORDER'

// initial state
const defaultProduct = []

// action creator

export const getGuestOrder = product => ({
  type: GUEST_ORDER,
  product
})

// //thunk creator

// export const fetchGuestOrder = id => {
//   return async dispatch => {
//     try {
//       dispatch(getGuestOrder())
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

// reducer
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GUEST_ORDER:
      return [...state, action.product]
    default:
      return state
  }
}
