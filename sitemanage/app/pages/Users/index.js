import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAll } from '../../../redux/fetchUsers.js'

const Users = () => {

    const dispatch = useDispatch()
    const { fetchUsers } = useSelector(state => state.fetch)
    useEffect(() => {
        dispatch(fetchUsersAll())
    }, [dispatch])

    return (
        <View>
            {fetchUsers && fetchUsers.length > 0
                ?
                fetchUsers.map((item, index) => (<Pressable key={index}>
                    <Text>
                        {item.firstname}
                    </Text>
                </Pressable>))
                :
                <Text>Nothing to show</Text>}


        </View>
    )
}

export default Users