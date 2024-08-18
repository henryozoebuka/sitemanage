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

      <View style={{ backgroundColor: '#00f0ff', borderRadius: 10, marginBottom: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginVertical: 10, borderColor: 'blue', borderRadius: 50, borderWidth: 2, width: 100, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
            <Text style={[{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', color: '#ffffff', fontSize: 60 }]}>{otherUser.firstname && otherUser.firstname.charAt(0)}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={[{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', color: 'blue' }, styles.text20]}>{otherUser.firstname}</Text>
        </View>
      </View>

      <View style={{ borderColor: '#00f0ff', borderWidth: .5, padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Account Number:</Text>
          <Text> {otherUser.accountNumber}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Username:</Text>
          <Text> {otherUser.username}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Firstname:</Text>
          <Text> {otherUser.firstname}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Lastname:</Text>
          <Text> {otherUser.lastname}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Role:</Text>
          <Text> {otherUser.role}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Balance:</Text>
          <Text> N{otherUser.balance}</Text>
        </View>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => { toggleAdminEditProfileModal() }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>
      {/* admin edit profile modal */}
      {adminEditProfileModal && <AdminEditProfileModal toggleAdminEditProfileModal={toggleAdminEditProfileModal} handleAdminEditProfileChange={handleAdminEditProfileChange} adminEditProfile={adminEditProfile} user={user} otherUser={otherUser} />}

    </SafeAreaView>

  )
}

export default OtherUser