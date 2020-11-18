import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import products from './product'
import singleproduct from './singleproduct'
import pendingOrdersReducer from './user_orders'
import guestOrder from './guestOrder'

const reducer = combineReducers({
  user,
  products,
  singleproduct,
  pendingOrders: pendingOrdersReducer,
  guestOrder
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
