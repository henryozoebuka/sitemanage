import { Pressable, TextInput, Text, View } from 'react-native'
import {styles} from '../../constants/styles.js'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'


const Materials = () => {
    const {url} = useSelector(state=>state.baseURL)
    const [data, setData] = useState([])
    const [searchResult, setSearchResult] = useState([])
    useEffect(()=>{
        fetchMaterials()
    }, [])

    const fetchMaterials = async () => {
        try {
            const response = await axios.get(`${url}/materials`)
            if(response.status===201) {
                alert(response.data.message)
            }
            else {
                setData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = (text) => {
        const filtered = data.filter(item => item.name.toLowerCase().includes(text.toLowerCase()))
        setSearchResult(filtered)
    }


  return (
    <View>
        <View>
            <TextInput style={styles.textInput} placeholder='Search items...' onChangeText={handleSearch} />
        </View>
      <Pressable>
        {searchResult.length > 0
        ? searchResult.map((item, index)=>(
            <Pressable key={index}>
                <Text>Item: {item.name}</Text>
                <Text>Qty: {item.quantity}</Text>                
            </Pressable>
        )) 
        : data.map((item, index)=>(
            <Pressable key={index}>
                <Text>Item: {item.name}</Text>
                <Text>Qty: {item.quantity}</Text>                
            </Pressable>
        ))}
      </Pressable>
    </View>
  )
}

export default Materials