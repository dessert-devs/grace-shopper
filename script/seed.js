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
    Product.create({
      name: 'Rainbow Cake',
      price: 4599,
      img: '/dessert-images/RainbowCake200x200.jpg',
      description: 'a cake that is rainbow',
      category: 'cake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Chocolate Chip Cookies',
      price: 700,
      img: '/dessert-images/ChocChipCookie_200x200.jpg',
      description: 'a cookie with chocolate chips',
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Donut',
      price: 500,
      img: '/dessert-images/Donut_200x200.jpg',
      description: 'A Strawberry Frosted Donut!',
      category: 'pastry',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Cupcake',
      price: 300,
      img: '/dessert-images/ChocCupcake_200x200.jpg',
      description: 'A Yummy Chocolate Frosted Cupcake!',
      category: 'cupcake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Valentines Bundle',
      price: 7000,
      img: '/dessert-images/ValentinesBundle_200x200.jpg',
      description: "A Bundle of our Cutest Valentine's Day Desserts!",
      category: 'seasonal',
      inventoryQty: 30
    })
  ])

  const orders = await Promise.all([
    Order.create({userId: 1}),
    Order.create({pending: false, userId: 2}),
    Order.create({pending: true, userId: 3})
  ])

  // const order_products = await Promise.all([
  //   Order_Product.create({
  //     orderId: 1,
  //     productId: 1,
  //     amount: 5
  //   }),
  //   Order_Product.create({
  //     orderId: 1,
  //     productId: 2,
  //     amount: 4
  //   }),
  //   Order_Product.create({
  //     orderId: 1,
  //     productId: 3,
  //     amount: 5
  //   }),
  //   Order_Product.create({
  //     orderId: 1,
  //     productId: 4,
  //     amount: 4
  //   }),
  //   Order_Product.create({
  //     orderId: 3,
  //     productId: 3,
  //     amount: 2
  //   })
  // ])
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
