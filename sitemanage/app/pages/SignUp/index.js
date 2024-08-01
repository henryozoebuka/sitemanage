import { RadioButton, Pressable, SafeAreaView, Text, View } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import { styles } from '../../constants/styles.js'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios'
import {useSelector} from 'react-redux'

const SignUp = () => {
  
    const navigation = useNavigation()
    const {url} = useSelector(state=>state.baseURL)
    const [data, setData] = useState({})

  
    const handleChange = (text, fieldName) => {
      setData({...data, [fieldName]: text})
    }
    
    const handleSubmit = async () => {
      try {
        const response = await axios.post(`${url}/signup`, data)
        if(response.status === 200) {
          alert(response.data.message)
          navigation.navigate('Login')
        } 
        else{
          alert(response.data.message)
        }
      } catch (error) {
        console.log(error)        
      }
    }
    
    
  return (
    <SafeAreaView>
      <Text>SignUp</Text>
      <View>
        <TextInput style={styles.textInput} placeholder='Username' value={data.username} onChangeText={(text)=>handleChange(text, 'username')}/>
        <TextInput style={styles.textInput} placeholder='Firstname' value={data.firstname} onChangeText={(text)=>handleChange(text, 'firstname')} />
        <TextInput style={styles.textInput} placeholder='Lastname' value={data.lastname} onChangeText={(text)=>handleChange(text, 'lastname')}/>
        <TextInput style={styles.textInput} placeholder='password' value={data.password} onChangeText={(text)=>handleChange(text, 'password')} secureTextEntry={true} />
        <TextInput style={styles.textInput} placeholder='Contact address' value={data.contactAddress} onChangeText={(text)=>handleChange(text, 'contactAddress')}/>
        <TextInput style={styles.textInput} placeholder='Phone number' value={data.phoneNumber} onChangeText={(text)=>handleChange(text, 'phoneNumber')}/>
        <Picker selectedValue={data.gender} onValueChange={(text)=>handleChange(text, 'gender')}>
          <Picker.Item label='Select Gender' value='' />
          <Picker.Item label='Male' value='male'/>
          <Picker.Item label='Female' value='female'/>
        </Picker>

      <Pressable onPress={handleSubmit} style={styles.button}>
      <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default SignUp