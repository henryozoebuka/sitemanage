import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const EditUser = ({route}) => {
    const {url} = useSelector(state=>state.baseURL)
    const {id} = route.params
    const [user, setuser] = useState({
        firstname: '',
        lastname: ''
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
                setuser({})
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
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>handleSubmit(user._id)}>Update</Text>
      </Pressable>
    </View>
  )
}

export default EditUser