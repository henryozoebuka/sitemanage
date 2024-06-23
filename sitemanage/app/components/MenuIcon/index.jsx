import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import { toggleMenu } from '../../../redux/menu';
import { toggleLoggedIn } from '../../../redux/loggedIn';
import { useNavigation } from '@react-navigation/native';


const MenuIcon = () => {
  const navigation = useNavigation()
    const {menu} = useSelector(state=>state.menuState)
    const { loggedIn } = useSelector(state => state.login)
    const dispatch = useDispatch()
    const handleLogout = () => {
      dispatch(toggleLoggedIn())
    }

  return (
    <View style={styles.safeAreaView}>
        <Pressable onPress={()=>dispatch(toggleMenu())}>
        {menu ? <AntDesign name="close" size={30} color="black" /> : <Feather name="menu" size={30} color="black" />}
        </Pressable>
        {!loggedIn 
        ? 
        <Pressable onPress={()=>navigation.navigate('Login')}>
          <Text>Login</Text>
        </Pressable>
        :
        <Pressable onPress={handleLogout}>
          <Text>Logout</Text>
        </Pressable>
        
      }      
    </View>
  )
}

export default MenuIcon

