const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user || req.user.user_type !== 'admin') {
    const err = new Error('Wait, this is illegal')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => res.json(product))
    .catch(next)
})

//admin adds a product to product inventory
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const addedProducts = await Product.create(req.body)
    res.json(addedProducts)
  } catch (err) {
    next(err)
  }
})

// admin modifies a product
router.put('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.update(req.body)
    const updated = await Product.findAll({
      where: {
        id: req.params.productId
      }
    })
    res.json(updated[0])
  } catch (error) {
    next(error)
  }
})

// admin deletes a product
router.delete('/:productId', adminsOnly, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    await product.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
