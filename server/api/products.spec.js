/* global describe beforeEach it */
const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
//Our test spec
describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('/api/all-products/', () => {
    const productName = 'Cookie'
    beforeEach(() => {
      return Product.create({
        name: productName,
        price: 400,
        inventoryQty: 500
      })
    })
    it('GET /api/all-products', async () => {
      const res = await request(app)
        .get('/api/all-products')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(productName)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')
