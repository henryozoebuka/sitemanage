import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useGlobalSearchParams} from 'expo-router'
import axios from 'axios'
import { useSelector } from 'react-redux'

const User = ({route}) => {
    // const params = useGlobalSearchParams()
    const {id} = route.params
    const {url} = useSelector(state=>state.baseURL)
    const [user, setUser] = useState({})
    useEffect(()=>{
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            console.log(id)
            const response = await axios.get(`${url}/user/${id}`)
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View>        
      <Pressable>
        <Text>{user.username}</Text>
        <Text>{user.firstname}</Text>
        <Text>{user.lastname}</Text>
      </Pressable>
    </View>
  )
}

export default User