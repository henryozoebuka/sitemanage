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
            // dispatch(setUsers(prevUsers => prevUsers.filter(items => items._id != id)))
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

        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <TextInput onChangeText={(text) => handleSearch(text)} style={styles.textInput} />
            </View>
            <ScrollView>
                {
                    dataToRender.map((item, index) => (
                        <Pressable key={index} onPress={() => navigation.navigate('Other User', { id: item._id })}>
                            <Text>Account Number: {item.accountNumber}</Text>
                            {item.photo ? <Image source={ { uri: `${url}/${item.photo}` } } />: <AntDesign name="adduser" size={50} color="black" />}
                            <Text>{item.username}</Text>
                            <Text>{item.firstname}</Text>
                            <Text>{item.lastname}</Text>
                            <Text>{item.gender}</Text>
                            <Text>{item.balance}</Text>
                            <Text>{item.role}</Text>
                            <Text>{item.accountNumber}</Text>
                            <Text>{item.createdAt}</Text>
                            <Pressable style={styles.button} onPress={() => { toggleDeleteModal(); setUserToDelete(item._id) }}>
                                <Text style={styles.buttonText}>Delete User</Text>
                            </Pressable>

                            {/* delete user modal */}
                            <Modal visible={deleteModal} animationType='slide' transparent={false}>
                                <View style={{ marginVertical: 'auto' }}>
                                    <View>
                                        <Text style={styles.text20}>Are you sure you want to delete the user account? ({userToDelete})</Text>
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