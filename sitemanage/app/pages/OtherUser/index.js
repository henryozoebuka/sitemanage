import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../constants/styles'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const OtherUser = ({ route }) => {
  const [user, setUser] = useState({})
  const { url } = useSelector(state => state.baseURL)
  useEffect(() => {
    fetchUser();
  }, [])
  const navigation = useNavigation()
  const id = route.params.id

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/user/${id}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <View>
        <Text>ID: {user._id}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Firstname: {user.firstname}</Text>
        <Text>Lastname: {user.lastname}</Text>
        <Text>Role: {user.role}</Text>
        <Text>Balance: {user.balance}</Text>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Edit User', { id: user._id })}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default OtherUser