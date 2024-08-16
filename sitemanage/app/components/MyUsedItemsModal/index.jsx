import { StyleSheet, Text, View, ActivityIndicator, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { styles } from '../../constants/styles.js'
import AntDesign from '@expo/vector-icons/AntDesign';

const MyUsedItemsModal = ({ data, toggleMyUsedItemsModal, loading, setLoading }) => {

  const { user } = useSelector(state => state.user)
  const { myUsedItems } = useSelector(state => state.myUsedItems)
  const [items, setItems] = useState([])
  const [myUsedItemsSummary, setMyUsedItemsSummary] = useState({})
  useEffect(() => {
    fetchMyUsedItems()
  }, [])

  const fetchMyUsedItems = async () => {
    const filteredUsedItems = await myUsedItems.filter(items => (items.removedBy && items.removedBy._id === user._id))
    setItems(filteredUsedItems)

    const myUsedSummary = filteredUsedItems.reduce((acc, item) => {
      const { name, quantity } = item
      if (!acc[name]) {
        acc[name] = 0
      }
      acc[name] += quantity

      return acc

    }, {}

    )
    setMyUsedItemsSummary(myUsedSummary)
  }

  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'green', maxHeight: '80%', width: '80%', borderRadius: 20, padding: 20 }}>
      <Pressable onPress={() => { toggleMyUsedItemsModal() }} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View>
                    <Text style={[styles.text20, { color: '#ffffff', fontWeight: 'bold', marginBottom: 10 }]}>My Used Items</Text>
                </View>
        <View>
          <View style={{ backgroundColor: 'gray', marginVertical: 10, padding: 10, borderRadius: 10 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center', paddingBottom: 5 }}>Summary of used items: </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
              {Object.keys(myUsedItemsSummary).map((item, index) => (
                <View key={index} style={{ display: 'flex', flexDirection: 'row', borderRadius: 5, backgroundColor: 'orange', }}>
                  <Text style={{ fontWeight: 'bold' }}>{item}: </Text>
                  <Text>{myUsedItemsSummary[item]}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <ScrollView>
          {loading ? <ActivityIndicator size={30} color={'blue'} /> :
            items && items.length > 0 ?
              items.map((item, index) => (
                <View key={index} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={[styles.text15, { fontWeight: 'bold' }]}>Items: </Text>
                    <Text>{item.name}</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={[styles.text15, { fontWeight: 'bold' }]}>Quantity:</Text>
                    <Text> {-item.quantity}</Text>
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={[styles.text15, { fontWeight: 'bold' }]}>Removed By: </Text>
                    {item.removedBy && <Text>{item.removedBy.firstname}</Text>}
                  </View>

                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={[styles.text15, { fontWeight: 'bold' }]}>Removed on: </Text>
                    <Text>{item.createdAt}</Text>
                  </View>
                </View>
              )) : <Text>Nothing to show</Text>
          }
        </ScrollView>
      </View>
    </View>
  )
}

export default MyUsedItemsModal