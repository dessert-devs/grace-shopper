const router = require('express').Router()
const {User, Product, Order, OrderDetail} = require('../db/models')
module.exports = router

/*
=========For User============

Set Up Route to User Order
- get route --> /api/user/:userId/pending-order
       - gets users pending order (current cart)

- post route --> /api/user/:userId/pending-order
      - user adds to cart

- put route  --> /api/user/:userId/pending-order
      - user updates cart quantity

- delete route --> /api/user/:userId/pending-order
      - user deletes smth from cart
*/

router.get('/:userId/pending-order', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        id: req.params.id
      },
      include: {model: Campus}
    })
    res.json(student[0])
  } catch (error) {
    next(error)
  }
})

/*
===========For Admin==========
we should also include '/delete'
*/

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
