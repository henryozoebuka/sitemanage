import { Pressable, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const { user } = useSelector(state => state.user)
    const { loggedIn } = useSelector(state => state.login)
    const navigation = useNavigation()

    const menuListA = ['Sign Up', 'Login']
    const menuListB = [user.role === 'admin' && 'Users', 'Materials', 'My Profile', 'Expenses', 'Reports', 'To Do']

    const menuToRender = !loggedIn ? menuListA : menuListB
    const handlePress = (item) => {
        navigation.navigate(item)
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, {flex:1, justifyContent: 'center', alignItems: 'center'}]}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
                {menuToRender && menuToRender.length && menuToRender.map((item, index) => (
                    <Pressable key={index} onPress={() => handlePress(item)} style={{paddingVertical: 10, width: '45%', backgroundColor: 'blue', borderRadius: 5}}>
                        <Text style={[styles.text20, {textAlign: 'center', color: '#ffffff', fontWeight: 'bold'}]}>{item}</Text>
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default Home