import { Text, TextInput, Pressable, View, ScrollView } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import AntDesign from '@expo/vector-icons/AntDesign';


const DeleteUserModal = ({ toggleDeleteUserModal, handleDeleteUser, userToDelete, userToDeleteId }) => {
useEffect(()=>{
    console.log(userToDeleteId)
}, [])
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', borderRadius: 20, padding: 20 }}>
                <Pressable onPress={()=>{toggleDeleteUserModal()}} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={30} color="#ffffff" />
                </Pressable>
                
                <View>
                    <Text>Are you sure you want to delete {userToDelete && userToDelete}'s account?</Text>
                </View>
                {/* Action buttons */}
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10}}>
                    <Pressable onPress={() => { handleDeleteUser(userToDeleteId) }} style={[styles.button, {width: '45%'}]}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </Pressable>
                    <Pressable onPress={() => { toggleDeleteUserModal() }} style={[styles.button, {width: '45%'}]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default DeleteUserModal