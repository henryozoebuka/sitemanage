import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { styles } from '../../constants/styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu, setMenuFalse } from '../../../redux/menu'

const Header = () => {
    const { user } = useSelector(state => state.user)
    const { loggedIn } = useSelector(state => state.login)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const menuRef = useRef(null)

    const handlePress = (item) => {
        navigation.navigate(item)
        dispatch(toggleMenu())
    }

    const { menu } = useSelector(state => state.menuState)
    const menuList = [!loggedIn && 'Sign Up', !loggedIn && 'Login', loggedIn && user.role === 'admin' && 'Users', 'Materials', 'My Profile', 'Test']
    const menuListA = ['Sign Up', 'Login']
    const menuListB = [user.role === 'admin' && 'Users', 'Materials', 'My Profile', 'Test', 'Reports']

    // useEffect(() => {
    //     const handleOutsidePress = (event) => {
    //         // Check if menuRef.current exists and event.target is not within menuRef
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             dispatch(setMenuFalse())
    //         }
    //     }

    //     return () => {
    //         // Clean up the event listener
    //         // document.removeEventListener('mousedown', handleOutsidePress)
    //     }
    // }, [menuRef, dispatch])

    const menuToRender = !loggedIn ? menuListA : menuListB

    return (
        <View>
            {menu && menuToRender ? menuToRender.map((item, index) => (
                <Pressable key={index} onPress={() => handlePress(item)}>
                    <Text style={styles.text20}>{item}</Text>
                </Pressable>
            )) : null}
        </View>
    )
}

export default Header
