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
    if (loggedIn) {
      navigation.navigate("My Profile");
    }
  }, [loggedIn]);

  const { user } = useSelector(state => state.user)
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
    <View style={styles.safeAreaView}>
      <View>
        <TextInput style={styles.textInput} placeholder='Username' onChangeText={(text) => handleChange(text, 'username')} />
        <TextInput style={styles.textInput} placeholder='Password' onChangeText={(text) => handleChange(text, 'password')} secureTextEntry={true}/>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
      <View>
        <Pressable onPress={() => navigation.navigate('Sign Up')} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>

    </View>
  )
}

export default Login