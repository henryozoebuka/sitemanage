import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import {useSelector, useDispatch} from 'react-redux'
import { toggleMenu } from '../../../redux/menu';


const MenuIcon = () => {
    const {menu} = useSelector(state=>state.menuState)
    const dispatch = useDispatch()
  return (
    <View style={styles.safeAreaView}>
        <Pressable onPress={()=>dispatch(toggleMenu())}>
        {menu ? <AntDesign name="close" size={30} color="black" /> : <Feather name="menu" size={30} color="black" />}
        </Pressable>      
    </View>
  )
}

export default MenuIcon

