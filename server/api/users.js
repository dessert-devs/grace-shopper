const router = require('express').Router()
const {User, Product, Order, Order_Product} = require('../db/models')
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
        userId: req.params.userId,
        pending: true
      },
      include: {
        model: Product
      }
    })
    res.json(orders[0])
  } catch (error) {
    next(error)
  }
})

//check whether userid+productid combination exists in order_product table
router.get('/:userId/pending-order/:productId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        pending: true
      },
      include: [
        {
          model: Product,
          where: {
            id: req.params.productId
          },
          required: true
        }
      ]
    })
    res.json(orders[0])
  } catch (error) {
    next(error)
  }
})

router.post('/:userId/pending-order', async (req, res, next) => {
  try {
    // if(req.body.firstName===undefined || req.body.lastName === undefined || req.body.email===undefined){
    //   res.status(500).json('Fields First Name, Last Name and Email are required!')
    // }

    //-----------------
    const addedCart = await Order.findOrCreate({
      where: {userId: req.params.userId, pending: true}
    })
    const order_id = addedCart[0].dataValues.id
    console.log(order_id)
    const {amount, price, total_price, product_id} = req.body
    // console.log('amount: ', )
    // const product = await Product.findAll({
    //   where: {
    //     name: product_name
    //   }
    // })
    // const product_id = product[0].dataValues.id
    const addedDetail = await Order_Product.create({
      orderId: order_id,
      amount,
      price,
      total_price,
      productId: product_id
    })
    res.json(addedDetail)
    //-------------------------------------
  } catch (err) {
    next(err)
  }
})

//we need the front end to have product Id
router.put('/:userId/pending-order/:productId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userId, pending: true}
    })
    const order_id = order[0].dataValues.id
    const order_product = await Order_Product.findAll({
      where: {
        orderId: order_id,
        productId: req.params.productId
      }
    })
    await order_product[0].update(req.body)

    const updated = await Order.findAll({
      where: {
        userId: req.params.userId,
        pending: true
      },
      include: [
        {
          model: Product,
          where: {
            id: req.params.productId
          }
        }
      ]
    })
    console.log('result: ', updated)
    res.json(updated[0].products[0])
  } catch (error) {
    next(error)
  }
})

router.delete('/:userId/pending-order/:productId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {userId: req.params.userId, pending: true}
    })
    const order_id = order[0].dataValues.id
    const order_product = await Order_Product.findAll({
      where: {
        orderId: order_id,
        productId: req.params.productId
      }
    })
    await order_product[0].destroy()
    res.sendStatus(204)
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
