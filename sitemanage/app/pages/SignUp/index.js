import { Pressable, SafeAreaView, Text, View } from 'react-native'
import { styles } from '../../constants/styles.js'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text>SignUp</Text>

      <View>
      <Pressable onPress={()=>navigation.navigate('Login')} style={styles.button}>
      <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default SignUp