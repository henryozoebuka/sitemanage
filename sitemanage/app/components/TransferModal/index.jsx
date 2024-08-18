import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import AntDesign from '@expo/vector-icons/AntDesign';

const TransferModal = ({ toggleTransferView, transferView, handleChange, handleTransfer, verifyAccount, transferData, loading, resetTransferData }) => {

    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: transferView ? 'flex' : 'none' }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', borderRadius: 20, padding: 20 }}>                
            <Pressable onPress={()=>{toggleTransferView(); resetTransferData()}} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View style={{marginBottom: 20}}>
                    <Text style={[styles.text20, { color: 'blue', fontWeight: 'bold', textAlign: 'center' }]}>Transfer Fund</Text>
                </View>
                {loading? <ActivityIndicator size={30} color={'blue'}/> : verifyAccount && verifyAccount.username ? 
                    <View>                        
                        <Text>{verifyAccount.firstname}</Text>
                        <Text>{verifyAccount.lastname}</Text>
                    </View> :
                    verifyAccount.message ? <Text>{verifyAccount.message}</Text> :
                    null
                }
                <TextInput value={transferData.receiverAccountNumber} placeholder='Account Number' onChangeText={(text) => handleChange(text, 'receiverAccountNumber')} style={styles.textInput} />
                <TextInput value={transferData.amount} placeholder='Amount' onChangeText={(text) => handleChange(text, 'amount')} style={styles.textInput} />

                <Pressable onPress={handleTransfer} style={[styles.button, {marginTop: 10}]} >
                    <Text style={styles.buttonText}>Transfer</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default TransferModal