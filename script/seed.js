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
      description:
        'Topped with vanilla buttercream and dancing with rainbow sprinkles, our vanilla Rainbow Cake brings a bright surprise with every slice!',
      category: 'cake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Chocolate Chip Cookies',
      price: 250,
      img: '/dessert-images/ChocChipCookie_200x200.jpg',
      description: 'A yummy cookie with chocolate chips!',
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Donut',
      price: 400,
      img: '/dessert-images/Donut_200x200.jpg',
      description: 'A strawberry-frosted donut!',
      category: 'pastry',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Chocolate Cupcake',
      price: 500,
      img: '/dessert-images/ChocCupcake_200x200.jpg',
      description: 'A tasty chocolate-frosted vanilla cupcake!',
      category: 'cupcake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Valentines Bundle',
      price: 7000,
      img: '/dessert-images/ValentinesBundle_200x200.jpg',
      description: "A bundle of our cutest Valentine's Day desserts!",
      category: 'seasonal',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Cannoli',
      price: 450,
      img: '/dessert-images/Cannoli_200x200.jpg',
      description: 'A classic Italian cannoli!',
      category: 'pastry',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Winter Cookie Bundle',
      price: 3000,
      img: '/dessert-images/WinterCookies_200x200.jpg',
      description: 'An 8 Pack of our delightful winter-themed cookies!',
      category: 'seasonal',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Unicorn Cake',
      price: 4999,
      img: '/dessert-images/UnicornCake_200x200.jpg',
      description:
        'Our famous rainbow cake, decorated like a mystical unicorn!',
      category: 'cake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Strawberry Shortcake',
      price: 3999,
      img: '/dessert-images/StrawbShortcake_200x200.jpg',
      description:
        'A light and airy cake topped and filled with fresh strawberries and whipped cream!',
      category: 'cake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Vanilla Cupcake',
      price: 500,
      img: '/dessert-images/VanillaCupcake_200x200.jpg',
      description: 'A tasty vanilla-frosted vanilla cupcake!',
      category: 'cupcake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Pastel Rainbow Slice',
      price: 1700,
      img: '/dessert-images/PastelRainbowSlice_200x200.jpg',
      description:
        'A slice of our newest, sweetest, strawberriest cake flavor!',
      category: 'cupcake',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Spring Cookies',
      price: 3000,
      img: '/dessert-images/SpringCookies.jpg',
      description: 'An 8 Pack of our blooming spring-themed cookies!',
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Easter Strawberries',
      price: 3500,
      img: '/dessert-images/EasterStrawberries_200x200.jpg',
      description:
        'A box of our decadent chocolate-covered strawberries, decorated in fun Easter colors and sprinkles!',
      category: 'strawberry',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Assorted Butter Cookies',
      price: 2500,
      img: '/dessert-images/AssortedCookies_200x200.jpg',
      description: 'A box of our yummiest bite-sized Italian butter cookies!',
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: 'Chocolate-Covered Strawberries',
      price: 3500,
      img: '/dessert-images/ValStrawberries_200x200.jpg',
      description: 'A box of our decadent chocolate-covered strawberries!',
      category: 'strawberry',
      inventoryQty: 30
    }),
    Product.create({
      name: `St. Patrick's Day Cookies`,
      price: 3000,
      img: '/dessert-images/StPatsDayCookies.jpg',
      description:
        "An 8 Pack of our whimsical St.Patrick's Day-themed cookies!",
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: `Sprinkle Cookie`,
      price: 500,
      img: '/dessert-images/SprinkleCookie_200x200.jpg',
      description: 'A yummy cookie with bright rainbow sprinkles!',
      category: 'cookie',
      inventoryQty: 30
    }),
    Product.create({
      name: `Lobster Tail`,
      price: 600,
      img: '/dessert-images/LobsterTail_200x200.jpg',
      description: 'A flaky lobster tail filled with a light, sweet cream!',
      category: 'pastry',
      inventoryQty: 30
    }),
    Product.create({
      name: `Ice Cream Sandwich`,
      price: 800,
      img: '/dessert-images/IceCreamSandwich_200x200.jpg',
      description:
        'A big scoop of vanilla bean ice cream, sandwiched between two delicious cookies of your choice!',
      category: 'cookie',
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
