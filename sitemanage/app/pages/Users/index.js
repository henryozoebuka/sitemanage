import { SafeAreaView, Pressable, Modal, ScrollView, Text, TextInput, View, Image } from 'react-native'
import { styles } from '../../constants/styles'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/users'
import axios from 'axios'
import DeleteUserModal from '../../components/DeleteUserModal';
import moment from 'moment'


const Users = () => {
    const dispatch = useDispatch()
    const { url } = useSelector(state => state.baseURL)
    const { users } = useSelector(state => state.users)
    const { user } = useSelector(state => state.user)
    const [searchResult, setSearchResult] = useState([])
    const [deleteUserModal, setDeleteUserModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
    const [userToDeleteId, setUserToDeleteId] = useState(null)
    useEffect(() => {
        fetchUsers()
    }, [])
    const navigation = useNavigation()

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/users`)
            dispatch(setUsers(response.data))

        } catch (error) {
            console.log(error)
        }
    }


    const handleDeleteUser = async (id) => {
        try {
            console.log(id)
            const response = await axios.delete(`${url}/user/${id}`)
            if (response) {
                alert(response.data.message)
                setDeleteUserModal(false)
            }
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDeleteUserModal = () => {
        setDeleteUserModal(!deleteUserModal)
    }

    const handleSearch = (text) => {
        const filter = users.filter(item => item.username.toLowerCase().includes(text.toLowerCase()) ||
            item.firstname.toLowerCase().includes(text.toLowerCase()) ||
            item.lastname.toLowerCase().includes(text.toLowerCase()) ||
            item.status.toLowerCase().includes(text.toLowerCase()) ||
            item.role.toLowerCase().includes(text.toLowerCase())

        )
        setSearchResult(filter || [])
    }

    const dataToRender = searchResult.length ? searchResult : users


    return (

        <SafeAreaView style={styles.safeAreaView}>
            {/* page title */}
            <View style={{marginBottom: 10}}>
                <Text style={{textAlign:'center', fontSize: 30, fontWeight: 'bold', color: 'blue'}}>Users</Text>
            </View>
            <View>
                <TextInput placeholder='Search user' onChangeText={(text) => handleSearch(text)} style={styles.textInput} />
            </View>
            <ScrollView>
                {
                    dataToRender.map((item, index) => (
                        <Pressable key={index} onPress={() => navigation.navigate('Other User', { id: item._id })} style={{ flexDirection: 'row', backgroundColor: '#00f0ff', alignItems: 'center', padding: 10, justifyContent: 'space-between', borderRadius: 10, marginBottom: 10 }}>
                            <View style={{ width: 50, height: 50, backgroundColor: '#ffffff', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 30, color: '#00f0ff' }}>{item.username && item.username.charAt(0)}</Text>
                            </View>

                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Username: </Text>
                                    <Text>{item.username}</Text>
                                </View>
                                
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Role: </Text>
                                    <Text>{item.role}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontWeight: 'bold' }}>Account number: </Text>
                                    <Text>{item.accountNumber}</Text>
                                </View>
                            </View>


                            <Pressable style={{backgroundColor: 'red', borderRadius: 10, padding: 10}} onPress={() => { toggleDeleteUserModal(); setUserToDeleteId(item._id), setUserToDelete(item.firstname) }}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </Pressable>

                        </Pressable>))
                }
            </ScrollView>

            {/* delete user modal */}
            {deleteUserModal && <DeleteUserModal toggleDeleteUserModal={toggleDeleteUserModal} handleDeleteUser={handleDeleteUser} userToDelete={userToDelete} userToDeleteId={userToDeleteId} />}

        </SafeAreaView>
    )
}

export default Users