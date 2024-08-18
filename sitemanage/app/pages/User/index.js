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
import AddFundModal from '../../components/AddFundModal/index.jsx'


const User = () => {

  const { url } = useSelector(state => state.baseURL)
  const { user } = useSelector(state => state.user)
  const { transferData } = useSelector(state => state.transferData)
  const [modalVisibility, setModalVisibility] = useState(false)
  const [editProfileModal, setEditProfileModal] = useState(false)
  const [myTransactions, setMyTransactions] = useState([])
  const [myTransactionsModal, setMyTransactionsModal] = useState(false)
  const [verifyAccount, setVerifyAccount] = useState({})
  const [editProfileData, setEditProfileData] = useState({})
  const [addFundData, setAddFundData] = useState({})
  const [addFundModal, setAddFundModal] = useState(false)

  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [transferView, setTransferView] = useState(false)
  const [userBalance, setUserBalance] = useState('')
  const navigation = useNavigation()


  useEffect(() => {
    dispatch(setTransferData({ ...transferData, sender: user._id }))
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
    let updatedData = { ...transferData }
    if (fieldName === 'amount') {
      value = parseFloat(text)
      updatedData = { ...updatedData, amount: value }
    }
    if (fieldName === 'receiverAccountNumber') {
      updatedData = { ...updatedData, receiverAccountNumber: value }
    }
    if (fieldName === 'receiverAccountNumber' && text.length > 5) {
      const fetchReceiver = async () => {
        try {
          setLoading(true)
          const response = await axios.get(`${url}/useraccount/${text}`)
          if (response.status === 200) {
            setVerifyAccount(response.data)
            dispatch(setTransferData({ ...transferData, receiver: response.data._id }))
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

  //handle add fund change
  const handleAddFundChange = (text, fieldName) => {
    let value = text
    if(fieldName === 'amount'){
      value = parseFloat(text)
      setAddFundData({...addFundData, id: user._id, [fieldName]: value})
    }
  }

  //add fund
  const addFund = async () => {
    try {
      setLoading(true)
      const response = await axios.patch(`${url}/addfund`, addFundData)
      if(response.status === 200){
        Alert.alert(response.data.message)
        toggleAddFundModal()
        setRefreshKey(refreshKey + 1)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  //handle edit profile change
  const handleEditProfileChange = (text, fieldName) => {
    setEditProfileData({ ...editProfileData, [fieldName]: text })
  }


  // fetch user transactions
  const fetchMyTransactions = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${url}/transactions`)
      if (response.status === 200) {
        const filteredTransactions = response.data.filter(item => item.receiver._id === user._id || item.sender._id === user._id)
        setMyTransactions(filteredTransactions)
      }
      else {
        setMyTransactions(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
    finally {
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

  //toggle edit profile modal
  const toggleAddFundModal = () => {
    setAddFundModal(!addFundModal)
  }


  const resetTransferData = () => {
    dispatch(setTransferData({
      ...transferData,
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
      <View style={{ backgroundColor: '#00f0ff', borderRadius: 10, marginBottom: 20 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ marginVertical: 10, borderColor: 'blue', borderRadius: 50, borderWidth: 2, width: 100, height: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
            <Text style={[{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', color: '#ffffff', fontSize: 60 }]}>{user.firstname && user.firstname.charAt(0)}</Text>
          </View>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={[{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold', color: 'blue' }, styles.text20]}>{user.firstname}</Text>
        </View>
      </View>

      <View style={{ borderColor: '#00f0ff', borderWidth: .5, padding: 20, borderRadius: 10, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Account Number:</Text>
          <Text>{user.accountNumber}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Username:</Text>
          <Text>{user.username}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Firstname:</Text>
          <Text>{user.firstname}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Lastname:</Text>
          <Text>{user.lastname}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Gender:</Text>
          <Text>{user.gender}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Role:</Text>
          <Text>{user.role}</Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontWeight: 'bold', color: 'blue' }}>Balance:</Text>
          <Text>N{userBalance ? userBalance : user.balance}</Text>
        </View>
      </View>

      {/* action buttons */}
      <View>

        <Pressable onPress={toggleTransferView} style={styles.button}>
          <Text style={styles.buttonText}>Transfer Fund</Text>
        </Pressable>

        <Pressable onPress={() => { toggleTransactionsModal(); fetchMyTransactions() }} style={styles.button}>
          <Text style={styles.buttonText}>Transactions History</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => { toggleEditProfileModal(); }}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </Pressable>
        {user.role === 'admin' &&
        <Pressable style={styles.button} onPress={() => { toggleAddFundModal(); }}>
        <Text style={styles.buttonText}>Add Fund</Text>
      </Pressable>
        }
      </View>

      {/* transfer fund Modal component */}
      <TransferModal transferView={transferView} toggleTransferView={toggleTransferView} handleChange={handleChange} handleTransfer={handleTransfer} verifyAccount={verifyAccount} transferData={transferData} loading={loading} resetTransferData={resetTransferData} />
      <TransactionsModal myTransactions={myTransactions} toggleTransactionsModal={toggleTransactionsModal} myTransactionsModal={myTransactionsModal} fetchMyTransactions={fetchMyTransactions} loading={loading} />

      {/* edit profile modal */}
      {editProfileModal && <EditProfileModal toggleEditProfileModal={toggleEditProfileModal} handleEditProfileChange={handleEditProfileChange} editProfile={editProfile} editProfileData={editProfileData} user={user} />}
      {/* add fund modal */}
      {addFundModal && <AddFundModal toggleAddFundModal={toggleAddFundModal} addFund={addFund} handleAddFundChange={handleAddFundChange} loading={loading} />}

    </SafeAreaView>
  )
}

export default User
