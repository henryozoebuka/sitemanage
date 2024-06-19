import { Modal, Pressable, Text, View, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { styles } from '../../constants/styles.js'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'

const User = ({ route }) => {
  const [modal, setModal] = useState(false)
  const [accounts, setAccounts] = useState([])
  const { id } = route.params
  const [verifiedAccount, setVerifiedAccount] = useState({})
  const [accountDetails, setAccountDetails] = useState({
    sender: id,
    receiver: '',
    amount: null,
  })
  const navigation = useNavigation()

  const { url } = useSelector(state => state.baseURL)
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchUser()
    fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(`${url}/users`)
      setAccounts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/user/${id}`)
      setUser(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  const handleTransferFund = async () => {
    try {
      const response = await axios.post(`${url}/transferFund`, accountDetails)
      if(response) {
        alert(response.data.message)
        if(response.status===200) {
          setAccountDetails({
            receiver: '',
            amount: ''
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  const handleChange = (text, fieldName) => {
    let value = text
    if(fieldName === 'amount') {
      value = parseFloat(value)
    }

    if(fieldName === 'receiver' && value.length) {
      const filtered = accounts.filter(item => item._id.toLowerCase() === value.toLowerCase())
        setVerifiedAccount(filtered)        
    }

    setAccountDetails({...accountDetails, [fieldName]: value})

      
      // if(accountDetails.receiver.length >= 24) {
      //   const filtered = accounts.filter(item => item._id.toLowerCase() ===  receiver.toLowerCase())
      //   setVerifiedAccount(filtered)        
      // }     
  }

  return (
    <View style={styles.safeAreaView}>
      <Pressable>
        <Text>username: {user.username}</Text>
        <Text>Firstname: {user.firstname}</Text>
        <Text>Lastname: {user.lastname}</Text>
        <Text>Balance: {user.balance}</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Edit User', { id: id })}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={toggleModal} >
        <Text style={styles.buttonText}>Transfer Fund</Text>
      </Pressable>

      <Modal animationType='slide' visible={modal} transparent={true} onRequestClose={() => {
        // Handle modal close (Android back button)
        setModalVisible(!modalVisible);
      }}>
        <View style={{ height: 400, width: 400, borderWidth: 2, borderColor: 'gray', alignItems: 'center', justifyContent: 'center', backgroundColor: 'gray' }}>

          <View>
            <TextInput placeholder='Enter Account Number' value={accountDetails.receiver} onChangeText={(text) => handleChange(text, 'receiver')} />
            <TextInput placeholder='Enter Amount' value={accountDetails.amount} onChangeText={(text) => handleChange(text, 'amount')} />
            {verifiedAccount.length ? <Text>{verifiedAccount[0].firstname}</Text> : <Text>Account does not exist.</Text>}
          </View>
          <Pressable style={styles.button} onPress={handleTransferFund} >
            <Text style={styles.buttonText}>Transfer</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={toggleModal} >
            <Text style={styles.buttonText}>Close modal</Text>
          </Pressable>
        </View>
      </Modal>


    </View>
  )
}

export default User