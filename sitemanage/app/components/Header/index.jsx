import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../../../redux/menu'

const Header = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const {menu} = useSelector(state=>state.menuState)
    const menuList = ['Sign Up', 'Login', 'Users', 'Add Material', 'Materials', 'Transactions']
    return (
        
        <View style={styles.safeAreaView}>
            {menu && menuList ? menuList.map((item, index) => (
                <Pressable key={index} onPress={() => {navigation.navigate(item); dispatch(toggleMenu())}}>
                    <Text style={styles.text20}>{item}</Text>
                </Pressable>
            )) : null}
        </View>
    )
}

export default Header