const User = require('./user')
const Order = require('./order')
const Order_Product = require('./order_product')
const Product = require('./product')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Order.belongsTo(User)
User.hasMany(Order)
Product.belongsToMany(Order, {through: Order_Product})
Order.hasMany(Order_Product)
Product.hasMany(Order_Product)
Order_Product.belongsTo(Product)
Order.belongsToMany(Product, {through: Order_Product})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Order,
  Product,
  Order_Product
}
