import { Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../constants/styles'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'

const OtherUser = ({ route }) => {
  const [otherUser, setOtherUser] = useState({})
  const { url } = useSelector(state => state.baseURL)
  useEffect(() => {
    fetchUser();
  }, [])
  const navigation = useNavigation()
  const id = route.params.id

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/user/${id}`)
      setOtherUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <View>
        <Text>Account Number: {otherUser.accountNumber}</Text>
        <Text>Username: {otherUser.username}</Text>
        <Text>Firstname: {otherUser.firstname}</Text>
        <Text>Lastname: {otherUser.lastname}</Text>
        <Text>Role: {otherUser.role}</Text>
        <Text>Balance: {otherUser.balance}</Text>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Edit User', { id: otherUser._id })}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default OtherUser