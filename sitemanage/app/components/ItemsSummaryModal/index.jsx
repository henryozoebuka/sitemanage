import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'
import AntDesign from '@expo/vector-icons/AntDesign';

const ItemsSummaryModal = ({ loading, toggleItemsSummaryModal, filteredMaterials }) => {
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: '#00f0ff', maxHeight: '90%', width: '80%', borderRadius: 20, padding: 20 }}>
            <Pressable onPress={() => { toggleItemsSummaryModal(); }} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {/* component title */}
                <View>
                    <Text style={[styles.text20, { color: 'blue', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }]}>Items in Stock</Text>
                </View>
                <ScrollView style={{marginVertical: 20}}>
                {loading ? <ActivityIndicator color={'blue'} size={30} /> : filteredMaterials &&
                    Object.keys(filteredMaterials).map((item, index) => (
                        <View key={index} style={{ flex: 1, backgroundColor: '#ffffff', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.text15, { fontWeight: 'bold' }]}>Item:  </Text>
                                <Text>{item}</Text>
                            </View>


                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.text15, { fontWeight: 'bold' }]}>Total: </Text>
                                <Text>{filteredMaterials[item]}</Text>
                            </View>
                        </View>
                    ))

                }
                
                </ScrollView>
            </View>

        </View>
    )
}

export default ItemsSummaryModal