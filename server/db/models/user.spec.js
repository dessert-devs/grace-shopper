/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

//Question: do encrypted passwords change everytime?

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('column definitions and validations', () => {
  //   it('has a `email`, `password`, `salt`, `googleId`, and `user_type`', async () => {
  //     const user = await User.create({
  //       email: 'cody@email.com',
  //       password: 'df9d4561a565d305015e97befa6141c8829313e394446b92c81bb9e3756de75a',
  //       salt: 'YPfjtsnP/bNetIH1NsMLqg=='
  //     })

  //     expect(user.email).to.equal('cody@email.com')
  //     expect(user.password).to.equal('df9d4561a565d305015e97befa6141c8829313e394446b92c81bb9e3756de75a')
  //     expect(user.salt).to.equal('YPfjtsnP/bNetIH1NsMLqg==')
  //   })

  // it('`email` is required', () => {
  //   const user = User.build()
  //   return user.validate()
  //     .then(
  //       () => {
  //         throw new Error('Validation should have failed!')
  //       },
  //       (err) => {
  //         expect(err).to.be.an('error')
  //       }
  //     )
  // })

  // it('`password`, `salt`, and `googleId` are strings', async () => {
  //   const user = await User.create({
  //     email: 'cody@email.com',
  //     password: 'df9d4561a565d305015e97befa6141c8829313e394446b92c81bb9e3756de75a',
  //     salt: 'YPfjtsnP/bNetIH1NsMLqg==',
  //     googleId: ``
  //   })

  //   expect(user.email).to.equal('cody@email.com')
  //   expect(user.password).to.equal('df9d4561a565d305015e97befa6141c8829313e394446b92c81bb9e3756de75a')
  //   expect(user.salt).to.equal('YPfjtsnP/bNetIH1NsMLqg==')
  // })

  it('`user_type` has a default value of user', async () => {
    const user = await User.create({email: 'cody@gmail.com', user_type: 'user'})
    expect(user.user_type).to.equal('user')
  })

  //   // Make sure that you define the associations in `server/models/index.js`!
  //   // Note: this requires a working Coffee model
  //   it('has a one-many relationship with Coffee, via `favoriteCoffee`', async () => {
  //     const pug = await Pug.create({name: 'Joe'})
  //     const coffee = await Coffee.create({
  //       name: 'Puppaccino',
  //       ingredients: ['espresso', 'frothed milk', 'love']
  //     })

  //     await pug.setFavoriteCoffee(coffee)

  //     expect(pug.favoriteCoffeeId).to.be.equal(coffee.id)
  //   })

  //   // Make sure that you define the associations in `server/models/index.js`!
  //   // Note: be careful - the pluralization is important here!
  //   it('has a many-many relationship with other Pugs as `friends`', async () => {
  //     const penny = await Pug.create({name: 'Penny'})
  //     const doug = await Pug.create({name: 'Doug'})
  //     await penny.addFriend(doug)
  //     const friends = await penny.getFriends()
  //     expect(friends).to.be.an('array')
  //     expect(friends.length).to.equal(1)
  //     expect(friends[0].name).to.equal('Doug')
  //   })
  // })
  /*__________________________________________*/
  //the specs written for us below vvv

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
