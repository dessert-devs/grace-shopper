/* global describe beforeEach it */
const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  //Our test spec --vvv--
  describe('column definitions and validations', () => {
    it('has a `name`, `price`, and `img`, `description`, `category`, `inventoryQty`', async () => {
      const product = await Product.create({
        name: 'Rainbow Cake',
        price: 4599,
        img: '/dessert-images/RainbowCake200x200.jpg',
        description: 'a cake that is rainbow',
        category: 'cake',
        inventoryQty: 30
      })
      expect(product.name).to.equal('Rainbow Cake')
      expect(product.price).to.equal(4599)
      expect(product.img).to.equal('/dessert-images/RainbowCake200x200.jpg')
      expect(product.description).to.equal('a cake that is rainbow')
      expect(product.category).to.equal('cake')
      expect(product.inventoryQty).to.equal(30)
    })
    it('`name`, `name`, `inventoryQty` are required', () => {
      const product = Product.build()
      return product.validate().then(
        () => {
          throw new Error('Validation should have failed!')
        },
        err => {
          expect(err).to.be.an('error')
        }
      )
    })
    it('`img` has a default value of `https://i.redd.it/xpfwwehbsll41.jpg`', async () => {
      const product = await Product.create({
        name: 'Rainbow Cake',
        price: 4599,
        description: 'a cake that is rainbow',
        category: 'cake',
        inventoryQty: 30
      })
      expect(product.img).to.equal('https://i.redd.it/xpfwwehbsll41.jpg')
    })
  })
})
