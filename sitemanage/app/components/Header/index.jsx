import { Pressable, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../../../redux/menu'

const Header = () => {
    const { user } = useSelector(state => state.user)
    const { loggedIn } = useSelector(state => state.login)
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const handlePress = (item) => {
        navigation.navigate(item)
        dispatch(toggleMenu())
    }

    const { menu } = useSelector(state => state.menuState)
    const menuList = [!loggedIn && 'Sign Up', !loggedIn && 'Login', loggedIn && user.role === 'admin' && 'Users', 'Materials', 'My Profile', 'Expenses']
    const menuListA = ['Sign Up', 'Login']
    const menuListB = [user.role === 'admin' && 'Users', 'Materials', 'My Profile', 'Expenses', 'Reports', 'To Do']

    const menuToRender = !loggedIn ? menuListA : menuListB

    return (
        <View style={{ display: menu ? 'flex': 'none', position: 'absolute', top: 100, left: 0, zIndex: 11, borderWidth: 2, borderColor: 'blue', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 20, backgroundColor: '#ffffff' }}>
            {/* {menu && menuToRender ? menuToRender.map((item, index) => (
            <Pressable key={index} onPress={() => handlePress(item)}>
                <Text style={styles.text20}>{item}</Text>
            </Pressable>
        )) : null}     */}
        </View>
        
    )
}

export default Header
