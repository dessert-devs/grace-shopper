const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('order_product', {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  total_price: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order_Product
