const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  pending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
})

module.exports = Order
