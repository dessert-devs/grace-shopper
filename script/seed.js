'use strict'

const db = require('../server/db')
const {User, Product, Order, OrderDetail} = require('../server/db/models')

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
      password: '3455',
      user_type: 'user'
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
    Order.create({pending: 1, userId: 1}),
    Order.create({pending: 0, userId: 2}),
    Order.create({pending: 1, userId: 3})
  ])

  const orderDetails = await Promise.all([
    OrderDetail.create({orderId: 1, productId: 1, amount: 5}),
    OrderDetail.create({orderId: 2, productId: 2, amount: 4}),
    OrderDetail.create({orderId: 3, productId: 3, amount: 2})
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
