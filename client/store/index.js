import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import pendingOrdersReducer from '../redux/user_orders'
import singleOrdersReducer from '../redux/single_user_order'

const reducer = combineReducers({
  user,
  pendingOrders: pendingOrdersReducer,
  singleOrder: singleOrdersReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
