import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Transactions = () => {
    const { url } = useSelector(state => state.baseURL)
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async () => {
        try {
            const response = await axios.get(`${url}/transactions`)
            if(response.status === 400) {
                alert(response.data.message)
            }
            else {
                setTransactions(response.data)                
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View>
            {transactions && transactions.length 
            ? 
            transactions.map((item, index)=>(
                <Pressable key={index}>
                    <Text>{item.receiver}</Text>
                    <Text>{item.sender}</Text>
                    <Text>{item.amount}</Text>
                    <Text>{item.createdAt}</Text>
                </Pressable>
            ))
            : 
            <Text>No transactions found.</Text>}
        </View>
    )
}

export default Transactions