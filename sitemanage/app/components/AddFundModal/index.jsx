import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import AntDesign from '@expo/vector-icons/AntDesign';

const AddFundModal = ({ toggleAddFundModal, handleAddFundChange, addFund, loading }) => {

    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', borderRadius: 20, padding: 20 }}>
                <Pressable onPress={() => { toggleAddFundModal() }} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View style={{ marginBottom: 20 }}>
                    <Text style={[styles.text20, { color: 'blue', fontWeight: 'bold', textAlign: 'center' }]}>Add Fund</Text>
                </View>

                <TextInput placeholder='Amount' onChangeText={(text) => handleAddFundChange(text, 'amount')} style={styles.textInput} />

                <Pressable onPress={() => { addFund() }} style={[styles.button, { marginTop: 10, justifyContent: 'center', alignItems: 'center' }]} >
                    {loading ? <ActivityIndicator size={30} color={'#00f0ff'} /> : <Text style={styles.buttonText}>Add</Text>}
                </Pressable>
            </View>
        </View>
    )
}

export default AddFundModal