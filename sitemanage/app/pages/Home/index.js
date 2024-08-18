import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import bgImage from '../../../assets/images/site-manager-image.png'

const Home = () => {
    const { user } = useSelector(state => state.user)
    const { loggedIn } = useSelector(state => state.login)
    const navigation = useNavigation()

    const menuListA = ['Sign Up', 'Login']
    const menuListB = ['Users', 'Materials', 'My Profile', 'Expenses', 'Reports', 'To Do']
    const menuListC = ['Materials', 'My Profile', 'Expenses', 'Reports', 'To Do']

    const menuToRender = !loggedIn ? menuListA : loggedIn && user.role === 'admin' ? menuListB : menuListC
    const handlePress = (item) => {
        navigation.navigate(item)
    }

    return (
        <SafeAreaView style={[styles.safeAreaView, { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00f0ff' }]}>
            <View style={{ marginBottom: 20 }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ffffff', fontSize: 30 }}>Welcome, {user.firstname}!</Text>
            </View>
            <Image source={bgImage} style={{ height: '50%', width: '80%', resizeMode: 'contain', marginBottom: 20 }} />


            <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, justifyContent: 'space-evenly' }}>
                {menuToRender && menuToRender.length && menuToRender.map((item, index) => (
                    <Pressable key={index} onPress={() => handlePress(item)} style={{ paddingVertical: 10, width: '45%', backgroundColor: 'blue', borderRadius: 5 }}>
                        <Text style={[styles.text20, { textAlign: 'center', color: '#ffffff', fontWeight: 'bold' }]}>{item}</Text>
                    </Pressable>
                ))}
            </View>
        </SafeAreaView>
    )
}

export default Home