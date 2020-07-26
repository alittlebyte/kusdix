import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import AppFn from './components/AppFn'
import store from './store/store.js'

render(
  <Provider store={store}>
    <AppFn />
  </Provider>,
  document.getElementById('root')
);