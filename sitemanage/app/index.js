import 'react-native-gesture-handler';
import store from '../redux/store.js'
import { Provider } from 'react-redux'
import React from 'react'
import MyStack from './stacks.js';
import Header from './components/Header/index.jsx';
import MenuIcon from './components/MenuIcon/index.jsx';

const App = () => {

  return (
    <Provider store={store}>      
      <MenuIcon />
      <MyStack />
    </Provider>
  )
}

export default App
