import { Text, TextInput, Pressable, View, ScrollView } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useEffect } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import AntDesign from '@expo/vector-icons/AntDesign';
import OtherUser from '../../pages/OtherUser/index.js';



const AdminEditProfileModal = ({ toggleAdminEditProfileModal, handleAdminEditProfileChange, adminEditProfile, adminEditProfileData, user, otherUser }) => {

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', borderRadius: 20, padding: 20 }}>
                <Pressable onPress={toggleAdminEditProfileModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View style={{marginBottom: 20}}>
                    <Text style={[styles.text20, { color: 'blue', textAlign: 'center', fontWeight: 'bold' }]}>Admin Edit Profile</Text>
                </View>
                <ScrollView>
                    <TextInput style={styles.textInput} value={otherUser.firstname} onChangeText={(text) => handleAdminEditProfileChange(text, 'firstname')} />
                    <TextInput style={styles.textInput} value={otherUser.lastname} onChangeText={(text) => handleAdminEditProfileChange(text, 'lastname')} />

                    <View style={{width: '100%', backgroundColor: '#ffffff', borderRadius: 25, marginBottom: 10}}>
                        <RNPickerSelect
                            value={otherUser.gender}
                            onValueChange={(value) => handleAdminEditProfileChange(value, 'gender')}
                            items={[{ label: 'Gender', value: '' },
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },]}
                        />
                    </View>

                    {user.role === 'admin' &&
                        <>
                            <View style={{width: '100%', backgroundColor: '#ffffff', borderRadius: 25, marginBottom: 10}}>
                                <RNPickerSelect
                                    value={otherUser.role}
                                    onValueChange={(value) => handleAdminEditProfileChange(value, 'role')}
                                    items={[{ label: 'Role', value: '' },
                                    { label: 'Admin', value: 'admin' },
                                    { label: 'User', value: 'user' },]}
                                />
                            </View>

                            <View style={{width: '100%', backgroundColor: '#ffffff', borderRadius: 25, marginBottom: 10}}>
                                <RNPickerSelect
                                    value={otherUser.status}
                                    onValueChange={(value) => handleAdminEditProfileChange(value, 'status')}
                                    items={[{ label: 'Status', value: '' },
                                    { label: 'Active', value: 'active' },
                                    { label: 'Inactive', value: 'inactive' },]}
                                />
                            </View>
                        </>

                    }
                </ScrollView>

                {/* Action buttons */}
                <View>
                    <Pressable onPress={() => { adminEditProfile(otherUser._id) }} style={styles.button}>
                        <Text style={styles.buttonText}>Update</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default AdminEditProfileModal