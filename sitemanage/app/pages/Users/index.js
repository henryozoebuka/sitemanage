import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { styles } from '../../constants/styles'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'



const Users = () => {
    const { url } = useSelector(state => state.baseURL)
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetchUsers()
    }, [])
    const navigation = useNavigation()

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/users`)
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${url}/user/${id}`)
            setUsers(prevUsers => prevUsers.filter(items => items._id != id))
            alert(response.data.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.safeAreaView}>
            <ScrollView>
                {users && users.length > 0
                    ?
                    users.map((item, index) => (<Pressable key={index} onPress={() => navigation.navigate('User', { id: item._id })}>
                        <Text>
                            {item.username}
                        </Text>
                        <Text>
                            {item._id}
                        </Text>
                        <Text>
                            {item.firstname}
                        </Text>
                        <Text>
                            {item.lastname}
                        </Text>
                        <Text>
                            {item.createdAt}
                        </Text>
                        <Pressable style={styles.button} onPress={()=>handleDelete(item._id)}>
                            <Text style={styles.buttonText}>Delete User</Text>
                        </Pressable>
                    </Pressable>))
                    :
                    <Text>Nothing to show</Text>}

            </ScrollView>
        </View>
    )
}

export default Users