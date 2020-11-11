const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      notEmpty: true
    }
  },

  img: {
    type: Sequelize.STRING,
    defaultValue: 'https://i.redd.it/xpfwwehbsll41.jpg' // README: update default value to match branding
  },

  description: {
    type: Sequelize.TEXT
  },

  category: {
    type: Sequelize.STRING // README: maybe should be array for multiple tags?
  },

  inventoryQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
