import { Pressable, StyleSheet, Text, View } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import { styles } from '../../constants/styles.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const User = ({route}) => {
    const navigation = useNavigation()
    const {id} = route.params
    const {url} = useSelector(state=>state.baseURL)
    const [user, setUser] = useState({})
    useEffect(()=>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {            
            const response = await axios.get(`${url}/user/${id}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.safeAreaView}>        
      <Pressable>
        <Text>{user.username}</Text>
        <Text>{user.firstname}</Text>
        <Text>{user.lastname}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={()=>navigation.navigate('Edit User', {id: id})}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>
    </View>
  )
}

export default User