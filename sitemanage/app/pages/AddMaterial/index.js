import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import {styles } from '../../constants/styles.js'
import {useSelector} from 'react-redux'
import React, { useState } from 'react'
import axios from 'axios'

const AddMaterial = () => {
    const {url} = useSelector(state=>state.baseURL)
    const [data, setData] = useState({})
    const handleChange = (text, fieldName) => {
        let value = text
        if(fieldName==='quantity'){
            value = parseFloat(text)
        }
        setData({...data, [fieldName]: value})
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${url}/addmaterial`, data)
            if(response){
                alert(response.data.message)
                setData({name: '', quantity: ''})
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View>
        <View>
        <TextInput placeholder='Enter material name' style={styles.textInput} value={data.name} onChangeText={(text)=>handleChange(text, 'name')}/>
        </View>

        <View>
        <TextInput placeholder='Enter quantity' style={styles.textInput} value={data.quantity} onChangeText={(text)=>handleChange(text, 'quantity')} keyboardType="numeric"/>
        </View>
      <View>
        <Pressable onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AddMaterial

