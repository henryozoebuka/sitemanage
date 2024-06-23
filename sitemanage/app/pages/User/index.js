import { Pressable, Text, View, Modal, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../constants/styles.js'
import { setTransferData } from '../../../redux/transferData.js'
import { setUsers } from '../../../redux/users.js'
import axios from 'axios'

const User = () => {
  const [modalVisibility, setModalVisibility] = useState(false)
  const [verifyAccount, setVerifyAccount] = useState({})
  const navigation = useNavigation()
  const { url } = useSelector(state => state.baseURL)
  const { users } = useSelector(state => state.users)
  const { user } = useSelector(state => state.user)
  const { transferData } = useSelector(state => state.transferData)
  const dispatch = useDispatch()


  const handleChange = (text, fieldName) => {
    let value = text
    let acc = text
    if (fieldName === 'amount') {
      value = parseFloat(text)
    }
    if (fieldName === 'receiver'){
      let receiverAccount = acc
      const fetchReceiver = async () => {
        try {
          const response = await axios.get(`${url}/user/${receiverAccount}`)
          if(response.status === 200) {
            setVerifyAccount(response.data)
            console.log(verifyAccount)
          }
          else{
            setVerifyAccount(response.message)
          }
        } catch (error) {
          console.log(error)
        }
      }
      fetchReceiver()
      
      // const filterAccount = users.filter(user => user._id === receiverAccount)
    // setVerifyAccount(filterAccount)
    }

    dispatch(setTransferData({ ...transferData, sender: `${user._id}`, [fieldName]: value }))
    

  }

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
  }

  const resetTransferData = () => {
    dispatch(setTransferData({}))
    setVerifyAccount({})
  }

  

  const handleTransfer = async () => {
    try {
      const response = await axios.post(`${url}/transferFund`, transferData)
      if (response) {
        alert(response.data.message)
        if (response.status === 200) {
          setAccountDetails({
            receiver: '',
            amount: ''
          })
        }
        else if (response.status === 201) {
          alert(response.data.message)
        }
      }
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
        <Text>Gender: {user.gender}</Text>
        <Text>Role: {user.role}</Text>
        <Text>Balance: {user.balance}</Text>
      </View>
      <View>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Edit User', { id: user._id })}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>

        <Pressable onPress={toggleModalVisibility} style={styles.button}>
          <Text style={styles.buttonText}>Transfer Fund</Text>
        </Pressable>
      </View>

      <Modal visible={modalVisibility} animationType='slide' transparent='true'>
        <View style={{ width: '80%', backgroundColor: 'green', margin: 'auto', padding: '10%', borderRadius: 20 }}>
          <View>
            <TextInput placeholder='Account Number' onChangeText={(text) => handleChange(text, 'receiver')} style={styles.textInput} />
            {verifyAccount ? <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Text>{verifyAccount.firstname}</Text>
              <Text> {verifyAccount.lastname}</Text>
              </View> : null}
            <TextInput placeholder='Amount' onChangeText={(text) => handleChange(text, 'amount')} style={styles.textInput} />
          </View>
          <View>
            <Pressable onPress={handleTransfer} style={styles.button}>
              <Text style={styles.buttonText}>Transfer</Text>
            </Pressable>
            <Pressable onPress={() => { toggleModalVisibility(); resetTransferData() }} style={styles.button} >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default User
