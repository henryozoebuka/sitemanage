import { SafeAreaView, Alert, TextInput, Text, View, Pressable } from 'react-native'
import { styles } from '../../constants/styles.js'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { toggleLoggedIn } from '../../../redux/loggedIn.js'
import { setUser } from '../../../redux/user.js'


const Login = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { url } = useSelector(state => state.baseURL)
  const { loggedIn } = useSelector(state => state.login)

  useEffect(() => {
  }, [loggedIn]);

  const [data, setData] = useState({})

  const handleChange = (text, fieldName) => {
    setData({ ...data, [fieldName]: text })
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${url}/login`, data)
      if (response.status === 200) {
        dispatch(toggleLoggedIn())
        dispatch(setUser(response.data.user))
        Alert.alert(response.data.message)
      }
      else if (response.status === 201) {
        Alert.alert(response.data.message)
      }

      else if (response.status === 202) {
        Alert.alert(response.data.message)
      }
      else if (response.status === 203) {
        Alert.alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ marginBottom: 20 }}>
        <Text style={[styles.text20, { color: 'blue', fontWeight: 'bold' }]}>Login</Text>
      </View>
      <View>
        <TextInput style={styles.textInput} placeholder='Username' onChangeText={(text) => handleChange(text, 'username')} />
        <TextInput style={styles.textInput} placeholder='Password' onChangeText={(text) => handleChange(text, 'password')} secureTextEntry={true} />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('Sign Up')} style={[styles.button, { backgroundColor: '#ffffff', borderWidth: 2, borderColor: 'blue' }]}>
          <Text style={[styles.buttonText, { color: 'blue' }]}>Sign Up</Text>
        </Pressable>
      </View>

    </SafeAreaView>
  )
}

export default Login