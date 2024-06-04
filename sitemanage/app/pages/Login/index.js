import { SafeAreaView, Text, View, Pressable } from 'react-native'
import { styles } from '../../constants/styles.js'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Login = () => {
    const navigation = useNavigation()
  return (
    <View>
      <Text>Login</Text>

      <View>
      <Pressable onPress={()=>navigation.navigate('SignUp')} style={styles.button}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
    </View>
  )
}

export default Login