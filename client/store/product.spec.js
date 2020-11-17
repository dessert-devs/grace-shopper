/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {fetchProducts} from './product'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

//Our test spec

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('fetchProducts', () => {
    it('eventually dispatches the SET PRODUCTS action', async () => {
      const fakeProduct = {
        name: 'Cookie',
        price: 400,
        inventoryQty: 500
      }
      mockAxios.onGet('/api/all-products').replyOnce(200, fakeProduct)
      await store.dispatch(fetchProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('SET_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProduct)
    })
  })
})
