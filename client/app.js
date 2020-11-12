import React from 'react'

import {Navbar} from './components'
import shoppingCart from './components/shoppingCart'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <shoppingCart />
      <Routes />
    </div>
  )
}

export default App
