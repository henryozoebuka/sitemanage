import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles.js'


const ItemsSummaryModal = ({ loading, toggleItemsSummaryModal, filteredMaterials }) => {
    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ flex: 1, backgroundColor: 'green', maxHeight: '90%', width: '80%', borderRadius: 20, padding: 20 }}>
            <Text style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }, styles.buttonText]}>Items In Stock</Text>
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
                <Pressable style={styles.button} onPress={() => { toggleItemsSummaryModal(); }}>
                    <Text style={styles.buttonText}>Close</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default ItemsSummaryModal