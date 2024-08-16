import { SafeAreaView, Pressable, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../constants/styles'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import AdminEditProfileModal from '../../components/AdminEditProfileModal'

const OtherUser = ({ route }) => {
  const { user } = useSelector(state => state.user)
  const [otherUser, setOtherUser] = useState({})
  const { url } = useSelector(state => state.baseURL)
  const [adminEditProfileModal, setAdminEditProfileModal] = useState(false)
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

  
  //handle admin edit profile change
  const handleAdminEditProfileChange = (text, fieldName) => {
    setOtherUser({ ...otherUser, [fieldName]: text })
  }

  //handle admin edit profile submit
  const adminEditProfile = async () => {
    try {
      const response = await axios.patch(`${url}/user/${otherUser._id}`, otherUser)
      if (response.status === 200) {
        alert(response.data.message)
        if (user.role === 'admin') {
          navigation.navigate('Users')
        }
        else {
          () => navigation.navigate('My Profile')
        }
      }
      else {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //toggle admin edit profile modal
  const toggleAdminEditProfileModal = () => {
    setAdminEditProfileModal(!adminEditProfileModal)
  }



  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View>
        <Text>Account Number: {otherUser.accountNumber}</Text>
        <Text>Username: {otherUser.username}</Text>
        <Text>Firstname: {otherUser.firstname}</Text>
        <Text>Lastname: {otherUser.lastname}</Text>
        <Text>Role: {otherUser.role}</Text>
        <Text>Balance: {otherUser.balance}</Text>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => { toggleAdminEditProfileModal() }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
      {/* admin edit profile modal */}
      {adminEditProfileModal && <AdminEditProfileModal toggleAdminEditProfileModal={toggleAdminEditProfileModal} handleAdminEditProfileChange={handleAdminEditProfileChange} adminEditProfile={adminEditProfile} user={user} otherUser={otherUser}/>}

    </SafeAreaView>

  )
}

export default OtherUser