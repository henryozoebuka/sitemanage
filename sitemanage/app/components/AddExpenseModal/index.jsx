import { Pressable, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import AntDesign from '@expo/vector-icons/AntDesign';

const AddExpenseModal = ({ addExpense, toggleAddExpenseModal, handleChange }) => {
  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: '#00f0ff', width: '80%', borderRadius: 20, padding: 20 }}>
      <Pressable onPress={toggleAddExpenseModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <AntDesign name="close" size={24} color="#ffffff" />
        </Pressable>
        {/* component title */}
        <View style={{marginBottom: 20}}>
          <Text style={{color: 'blue', fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>Add Expense</Text>
        </View>
        <View>
          <TextInput style={styles.textInput} placeholder='Description' onChangeText={(text) => handleChange(text, 'item')} />
          <TextInput style={styles.textInput} placeholder='Amount' onChangeText={(text) => handleChange(text, 'amount')} />
        </View>
        {/* Action buttons */}
        <View>
          <Pressable onPress={addExpense} style={[styles.button, {marginTop: 10}]}>
            <Text style={styles.buttonText}>Post</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default AddExpenseModal