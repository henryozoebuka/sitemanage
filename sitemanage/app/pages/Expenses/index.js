import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { styles } from '../../constants/styles'
import AddExpenseModal from '../../components/AddExpenseModal'

const Expenses = () => {
    const { user } = useSelector(state => state.user)
    const { url } = useSelector(state => state.baseURL)
    const [expenses, setExpenses] = useState([])
    const [expenseData, setExpenseData] = useState({})
    const [addExpenseModal, setAddExpenseModal] = useState(false)
    const [refreshPage, setRefreshPage] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchExpenses()
    }, [refreshPage])

    //fetch user expenses
    const fetchExpenses = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/fetchexpenses/${user._id}`)
            if (response.status === 200) {
                setExpenses(response.data)
            }
            else {
                Alert.alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // handle add expense change
    const handleChange = (text, fieldName) => {

        let value = text
        if (fieldName === 'amount') {
            value = parseFloat(text)
        }
        setExpenseData({ ...expenseData, spenderId: user._id, [fieldName]: value })
        console.log(expenseData)

    }

    //toggle add expense modal
    const toggleAddExpenseModal = () => {
        setAddExpenseModal(!addExpenseModal)
        setExpenseData({})
    }

    //add expense function
    const addExpense = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${url}/postexpense`, expenseData)
            if (response.status === 200) {
                alert(response.data.message)
                setRefreshPage(refreshPage + 1)
                toggleAddExpenseModal()
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={{ marginBottom: 10 }}>
                <Text style={[styles.text20, { color: 'blue', fontWeight: 'bold' }]}>Expenses</Text>
            </View>
            <ScrollView>
                {loading ? <ActivityIndicator color={'blue'} size={30} /> :
                    expenses && expenses.length ? expenses.map((item) => (
                        <View key={item._id} style={{ backgroundColor: 'green', marginBottom: 10, padding: 10, borderRadius: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>{item.item}: </Text>
                                <Text>{item.amount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontWeight: 'bold' }}>Date: </Text>
                                <Text>{item.createdAt}</Text>
                            </View>
                        </View>
                    )) :
                        <View>
                            <Text>You do not have any expenses in your record.</Text>
                        </View>

                }
            </ScrollView>
            {/* action buttons */}
            <View>
                <Pressable onPress={() => { toggleAddExpenseModal() }} style={styles.button}>
                    <Text style={styles.buttonText}>Add Expense</Text>
                </Pressable>
            </View>
            {addExpenseModal && <AddExpenseModal addExpense={addExpense} toggleAddExpenseModal={toggleAddExpenseModal} handleChange={handleChange} />}
        </SafeAreaView>
    )
}

export default Expenses