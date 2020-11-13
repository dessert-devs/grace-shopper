const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://www.sketchappsources.com/resources/source-image/bakery-icon-set.jpg'
  }
})

module.exports = Product
