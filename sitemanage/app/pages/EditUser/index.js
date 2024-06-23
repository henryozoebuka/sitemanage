import { Pressable, Picker, Text, View, TextInput } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'

const EditUser = ({route}) => {
    
    const navigation = useNavigation()
    const {url} = useSelector(state=>state.baseURL)
    const {id} = route.params
    const [user, setuser] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        role: "",
    })
    useEffect(()=>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const response = await axios.get(`${url}/user/${id}`)
            setuser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (text, fieldName) => {
        setuser({...user, [fieldName]: text})
    }

    const handleSubmit = async (id) => {
        try {
            const response = await axios.patch(`${url}/user/${id}`, user)
            if(response.status===200) {
                alert(response.data.message)
                navigation.navigate('Users')
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <View style={styles.safeAreaView}>
      <TextInput style={styles.textInput} value={user.firstname} onChangeText={(text)=>handleChange(text, 'firstname')} />
      <TextInput style={styles.textInput} value={user.lastname} onChangeText={(text)=>handleChange(text, 'lastname')} />
      <TextInput style={styles.textInput} value={user.gender} onChangeText={(text)=>handleChange(text, 'gender')} />
      <RNPickerSelect
      value={user.role}
      onValueChange={(value)=>handleChange(value, 'role')}
      items={[{label: 'Role', value: ''},
        {label: 'Admin', value: 'admin'},
        {label: 'User', value: 'user'},]}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>handleSubmit(user._id)}>Update</Text>
      </Pressable>
    </View>
  )
}

export default EditUser