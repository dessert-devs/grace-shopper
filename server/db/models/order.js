const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pending: {
    type: Sequelize.ENUM(1, 0),
    allowNull: false
  }
})

module.exports = Order
