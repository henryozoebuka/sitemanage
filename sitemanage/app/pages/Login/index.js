import { SafeAreaView, Text, View, Pressable } from 'react-native'
import { styles } from '../../constants/styles.js'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { menuToggle } from '../../../redux/menu.js'

const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { menu } = useSelector((state) => state.menuState);
  return (
    <View style={styles.safeAreaView}>
      <Text>Login</Text>
      { menu ? <Text>Logged in.</Text> : null }
      {console.log(menu)}

      <View>
        <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

      <View>
        <Pressable onPress={() =>dispatch(menuToggle())} style={styles.button}>
          <Text style={styles.buttonText}>Toggle menu</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Login