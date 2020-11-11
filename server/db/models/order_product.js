const Sequelize = require('sequelize')
const db = require('../db')

const Order_Product = db.define('order_product', {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price_per_item: {
    type: Sequelize.DECIMAL(10, 2)
  },
  total_price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})

module.exports = Order_Product
