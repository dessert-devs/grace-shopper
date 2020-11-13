'use strict'

const db = require('../server/db')
const {User, Product, Order, Order_Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', user_type: 'admin'}),
    User.create({
      email: 'murphy@email.com',
      password: '123',
      user_type: 'user'
    }),
    User.create({
      email: 'mikyla@email.com',
      password: '3455'
    }),
    User.create({
      email: 'josephine@email.com',
      password: '3456',
      user_type: 'user'
    })
  ])

  const products = await Promise.all([
    Product.create({name: 'cupcake'}),
    Product.create({name: 'donut'}),
    Product.create({name: 'cake'}),
    Product.create({name: 'cookie'})
  ])

  const orders = await Promise.all([
    Order.create({userId: 1}),
    Order.create({pending: false, userId: 2}),
    Order.create({pending: true, userId: 3})
  ])

  const order_products = await Promise.all([
    Order_Product.create({
      orderId: 1,
      productId: 1,
      amount: 5,
      price_per_item: 5.0,
      total_price: 25.0
    }),
    Order_Product.create({
      orderId: 1,
      productId: 2,
      amount: 4,
      price_per_item: 4.0,
      total_price: 8.0
    }),
    Order_Product.create({
      orderId: 1,
      productId: 3,
      amount: 5,
      price_per_item: 4.0,
      total_price: 12.0
    }),
    Order_Product.create({
      orderId: 1,
      productId: 4,
      amount: 4,
      price_per_item: 5.0,
      total_price: 20.0
    }),
    Order_Product.create({
      orderId: 3,
      productId: 3,
      amount: 2,
      price_per_item: 2.0,
      total_price: 4.0
    })
  ])

  // console.log(`seeded ${users.length} users`)
  // console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
