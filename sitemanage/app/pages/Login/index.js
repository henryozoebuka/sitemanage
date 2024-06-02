import { SafeAreaView, Text, View, Pressable } from 'react-native'
import { styles } from '../../constants/styles.js'
import React from 'react'

const Login = () => {
  return (
    <View>
      <Text>Login</Text>

      <View>
      <Pressable onPress={()=>navigation.navigate('Login')} style={styles.button}>
      <Text>Login</Text>
      </Pressable>

      <Pressable onPress={()=>navigation.navigate('SignUp')} style={styles.button}>
      <Text>Sign Up</Text>
      </Pressable>
    </View>
    </View>
  )
}

export default Login