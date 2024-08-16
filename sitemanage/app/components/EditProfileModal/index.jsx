import { Text, TextInput, Pressable, View, ScrollView } from 'react-native'
import { styles } from '../../constants/styles.js'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import AntDesign from '@expo/vector-icons/AntDesign';


const EditProfileModal = ({ toggleEditProfileModal, handleEditProfileChange, editProfile, editProfileData, user }) => {

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'green', width: '80%', borderRadius: 20, padding: 20 }}>
                <Pressable onPress={toggleEditProfileModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View>
                    <Text style={[styles.text20, { color: '#ffffff', fontWeight: 'bold', marginBottom: 10 }]}>Edit Profile</Text>
                </View>
                <ScrollView>
                    <TextInput style={styles.textInput} value={editProfileData.firstname} placeholder='Item' onChangeText={(text) => handleEditProfileChange(text, 'item')} />
                    <TextInput style={styles.textInput} value={editProfileData.lastname} placeholder='Amount' onChangeText={(text) => handleEditProfileChange(text, 'amount')} />

                    <View style={styles.textInput}>
                        <RNPickerSelect
                            value={editProfileData.gender}
                            onValueChange={(value) => handleEditProfileChange(value, 'gender')}
                            items={[{ label: 'Gender', value: '' },
                            { label: 'Male', value: 'male' },
                            { label: 'Female', value: 'female' },]}
                        />
                    </View>

                    {user.role === 'admin' &&
                        <>
                            <View style={styles.textInput}>
                                <RNPickerSelect
                                    value={editProfileData.role}
                                    onValueChange={(value) => handleEditProfileChange(value, 'role')}
                                    items={[{ label: 'Role', value: '' },
                                    { label: 'Admin', value: 'admin' },
                                    { label: 'User', value: 'user' },]}
                                />
                            </View>

                            <View style={styles.textInput}>
                                <RNPickerSelect
                                    value={editProfileData.status}
                                    onValueChange={(value) => handleEditProfileChange(value, 'status')}
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
                    <Pressable onPress={() => { editProfile(editProfileData._id) }} style={styles.button}>
                        <Text style={styles.buttonText}>Update</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default EditProfileModal