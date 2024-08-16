import { SafeAreaView, Pressable, Modal, ScrollView, Text, TextInput, View, Image } from 'react-native'
import { styles } from '../../constants/styles'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../../../redux/users'
import axios from 'axios'


const Users = () => {
    const dispatch = useDispatch()
    const { url } = useSelector(state => state.baseURL)
    const { users } = useSelector(state => state.users)
    const { user } = useSelector(state => state.user)
    const [searchResult, setSearchResult] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [userToDelete, setUserToDelete] = useState(null)
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


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}/user/${id}`)
            alert(response.data.message)
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }

    const toggleDeleteModal = () => {
        setDeleteModal(!deleteModal)
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
            <View>
                <TextInput placeholder='Search user' onChangeText={(text) => handleSearch(text)} style={styles.textInput} />
            </View>
            <ScrollView>
                {
                    dataToRender.map((item, index) => (
                        <Pressable key={index} onPress={() => navigation.navigate('Other User', { id: item._id })}>
                            {item.photo ? <Image source={{ uri: `${url}/${item.photo}` }} /> : <AntDesign name="adduser" size={50} color="black" />}
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Username: </Text>
                                <Text>{item.username}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Firstname: </Text>
                                <Text>{item.firstname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Lastname: </Text>
                                <Text>{item.lastname}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Gender: </Text>
                                <Text>{item.gender}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Balance: </Text>
                                <Text>{item.balance}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Role: </Text>
                                <Text>{item.role}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Account number: </Text>
                                <Text>{item.accountNumber}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Created: </Text>
                                <Text>{item.createdAt}</Text>
                            </View>


                            <Pressable style={styles.button} onPress={() => { toggleDeleteModal(); setUserToDelete(item._id) }}>
                                <Text style={styles.buttonText}>Delete User</Text>
                            </Pressable>

                            {/* delete user modal */}
                            <Modal visible={deleteModal} animationType='slide' transparent={false}>
                                <View style={{ marginVertical: 'auto' }}>
                                    <View>
                                        <Text style={styles.text20}>Are you sure you want to delete this user? ({userToDelete})</Text>
                                    </View>
                                    <Pressable onPress={() => { handleDelete(userToDelete); toggleDeleteModal() }} style={styles.button}>
                                        <Text style={styles.buttonText}>Yes, delete!</Text>
                                    </Pressable>

                                    <Pressable onPress={() => toggleDeleteModal()} style={styles.button}>
                                        <Text style={styles.buttonText}>No, don't!</Text>
                                    </Pressable>
                                </View>
                            </Modal>
                        </Pressable>))
                }
            </ScrollView>

        </SafeAreaView>
    )
}

export default Users