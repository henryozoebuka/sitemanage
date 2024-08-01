import { Pressable, ScrollView, Text, View, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../constants/styles'
import { useSelector } from 'react-redux'


const TransactionsModal = ({ myTransactions, toggleTransactionsModal, myTransactionsModal, fetchMyTransactions, loading }) => {
const {user} = useSelector(state => state.user)


    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: myTransactionsModal ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1 }}>
            <View style={{ backgroundColor: 'green', width: '80%', maxHeight: '80%', paddingHorizontal: 10, borderRadius: 20 }}>
                <ScrollView>
                        {loading ? <ActivityIndicator size={30} color={'blue'} /> : myTransactions.length > 0 ?
                            myTransactions.map((item, index) => (
                                <View key={index} style={[styles.view, {backgroundColor: 'white', margin: 5, borderRadius: 10}]} >                                    
                                    <Text>Sender: {item.sender.firstname}</Text>                                    
                                    <Text>Receiver: {item.receiver.firstname}</Text>
                                    <Text>Amount: {item.amount}</Text>
                                    <Text>Description: {item.description}</Text>
                                    <Text>UserID: {user._id}</Text>
                                </View>
                            )):
                            <Text>You don't have any transactions.</Text>}
                    
                </ScrollView>
                <View style={{marginTop: 10}}>
                    <Pressable style={styles.button} onPress={toggleTransactionsModal}>
                        <Text style={styles.buttonText}>Close</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default TransactionsModal