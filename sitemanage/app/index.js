import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native'
import { styles } from './constants/styles.js'
import React from 'react'
import MyStack from './stacks.js';

const App = () => {
  const navigation = useNavigation()
  return (
    <MyStack />
  )
}

export default App
