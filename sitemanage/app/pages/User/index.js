import { SafeAreaView, Alert, ScrollView, Pressable, Text, View, Modal, TextInput } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { styles } from '../../constants/styles.js'
import { setTransferData } from '../../../redux/transferData.js'
// import { setTransactions } from '../../../redux/transactions'
import { resetUser } from '../../../redux/user.js';
import TransferModal from '../../components/TransferModal/index.jsx';
import TransactionsModal from '../../components/TransactionsModal/index.jsx';
import axios from 'axios'
import EditProfileModal from '../../components/EditProfileModal/index.jsx'


const User = () => {

  const { url } = useSelector(state => state.baseURL)
  const { user } = useSelector(state => state.user)
  const {transferData} = useSelector(state => state.transferData)
  const [modalVisibility, setModalVisibility] = useState(false)
  const [editProfileModal, setEditProfileModal] = useState(false)
  const [myTransactions, setMyTransactions] = useState([])
  const [myTransactionsModal, setMyTransactionsModal] = useState(false)
  const [verifyAccount, setVerifyAccount] = useState({})
  const [editProfileData, setEditProfileData] = useState({})
  
  const dispatch = useDispatch()
  
  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [transferView, setTransferView] = useState(false)
  const [userBalance, setUserBalance] = useState('')
  const navigation = useNavigation()
  
  
  useEffect(() => {
    dispatch(setTransferData({...transferData, sender: user._id}))
    fetchUserBalance()
    fetchUser()
  }, [refreshKey])

  //fetch user
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/user/${user._id}`)
      setEditProfileData(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  //handle edit profile submit
  const editProfile = async () => {
    try {
    const response = await axios.patch(`${url}/user/${editProfileData._id}`, editProfileData)
    if (response.status === 200) {
      alert(response.data.message)
      if (user.role === 'admin') {
        navigation.navigate('Users')
      }
      else {
        ()=>navigation.navigate('My Profile')
      }
    }
    else {
      alert(response.data.message)
    }
  } catch (error) {
    console.log(error)
  }
  }

  //fetch user balance
  const fetchUserBalance = async () => {
    try {
      const response = await axios.get(`${url}/user/${user._id}`)
      if (response) {
        setUserBalance(response.data.balance)
      }
    } catch (error) {
      console.log(error)
    }
  }


  //handle text transfer modal text input change
  const handleChange = (text, fieldName) => {
    let value = text
    let updatedData = {...transferData}
    if (fieldName === 'amount') {
      value = parseFloat(text)
      updatedData = {...updatedData, amount: value}
    }
    if (fieldName === 'receiverAccountNumber') {
      updatedData = {...updatedData, receiverAccountNumber: value}
    }
    if (fieldName === 'receiverAccountNumber' && text.length > 5) {
      const fetchReceiver = async () => {
        try {
          setLoading(true)
          const response = await axios.get(`${url}/useraccount/${text}`)
          if (response.status === 200) {
            setVerifyAccount(response.data)
            dispatch(setTransferData({...transferData, receiver: response.data._id}))
            // updatedData = {...updatedData, receiver: response.data._id}
            setLoading(false)
          }
          else if (response.status === 201) {
            setVerifyAccount(response.data)
            setLoading(false)
          }

        } catch (error) {
          console.log(error)
        }
      }
      fetchReceiver()
    }
    else if (fieldName === 'receiverAccountNumber' && text.length < 5) {
      setVerifyAccount({})
    }
    dispatch(setTransferData(updatedData))
  }

  //handle edit profile change
  const handleEditProfileChange = (text, fieldName) => {
    setEditProfileData({...editProfileData, [fieldName]: text})
  }


  // fetch user transactions
  const fetchMyTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/transactions`)
      if(response.status === 200) {
        const filteredTransactions = response.data.filter(item => item.receiver._id === user._id || item.sender._id === user._id)
        setMyTransactions(filteredTransactions)
      }
      else {
        setMyTransactions(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }


  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility)
  }

  //toggle transactions Modal
  const toggleTransactionsModal = () => {
    setMyTransactionsModal(!myTransactionsModal)
  }

  //toggle edit profile modal
  const toggleEditProfileModal = () => {
    setEditProfileModal(!editProfileModal)
  }

  
  const resetTransferData = () => {
    dispatch(setTransferData({...transferData, 
          receiver: '',
          receiverAccountNumber: '',
          amount: '',
        }))
    setVerifyAccount({})
    setLoading(false)
  }

  // trigger page refresh
  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  //handle transfer
  const handleTransfer = async () => {
    try {
      const response = await axios.post(`${url}/transferFund`, transferData)
      if (response) {
        Alert.alert(response.data.message)
        if (response.status === 200) {
          resetTransferData()
          triggerRefresh()
          toggleTransferView()
        }
        else if (response.status === 201) {
          Alert.alert(response.data.message)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  //toggle transfer view
  const toggleTransferView = () => {
    setTransferView(!transferView)
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>

      {/* user information */}
      <View>
        <Text>Account Number: {user.accountNumber}</Text>
        <Text>Username: {user.username}</Text>
        <Text>Firstname: {user.firstname}</Text>
        <Text>Lastname: {user.lastname}</Text>
        <Text>Gender: {user.gender}</Text>
        <Text>Role: {user.role}</Text>
        <Text>Balance: N{userBalance ? userBalance : user.balance}</Text>
      </View>

      {/* action buttons */}
      <View>

        <Pressable onPress={toggleTransferView} style={styles.button}>
          <Text style={styles.buttonText}>Transfer Fund</Text>
        </Pressable>

        <Pressable onPress={() => { toggleTransactionsModal(); fetchMyTransactions() }} style={styles.button}>
          <Text style={styles.buttonText}>Transactions History</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={()=>{toggleEditProfileModal(); }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
      </View>

      {/* transfer fund Modal component */}
      <TransferModal transferView={transferView} toggleTransferView={toggleTransferView} handleChange={handleChange} handleTransfer={handleTransfer} verifyAccount={verifyAccount} transferData={transferData} loading={loading} resetTransferData={resetTransferData} />
      <TransactionsModal myTransactions={myTransactions} toggleTransactionsModal={toggleTransactionsModal} myTransactionsModal={myTransactionsModal} fetchMyTransactions={fetchMyTransactions} loading={loading} />

      {/* edit profile modal */}
      {editProfileModal && <EditProfileModal toggleEditProfileModal={toggleEditProfileModal} handleEditProfileChange={handleEditProfileChange} editProfile={editProfile} editProfileData={editProfileData} user={user} />}
      
    </SafeAreaView>
  )
}

export default User
