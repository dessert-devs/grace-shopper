const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetail = db.define('orderDetail', {
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderDetail
