import { StyleSheet, Text, View, ActivityIndicator, TextInput, Pressable, Alert } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { styles } from '../../constants/styles.js'

const RemoveMaterialsModal = ({ toggleRemoveMaterialsModal, handleRemoveMaterialsChange, removeMaterials, removeMaterialsData, setRefreshFetchMaterials, refreshFetchMaterials }) => {


  const materials = [
    { label: 'Cement', value: 'Cement' },
    { label: '6" blocks', value: '6" blocks' },
    { label: '9" blocks', value: '9" blocks' },
    { label: '2 X 3 wood', value: '2 X 3 wood' },
    { label: '3" nails', value: '3" nails' },
  ];
  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', zIndex: 11, flex: 1, display: 'flex', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'green', width: '80%', borderRadius: 20, padding: 20 }}>

        <View>
          <Text style={[styles.buttonText, styles.text20, {fontWeight: 'bold', textAlign: 'center', marginBottom: 20}]}>Remove Items</Text>
        </View>
        <RNPickerSelect
          value={removeMaterialsData.name}
          onValueChange={(value) => handleRemoveMaterialsChange(value, 'name')}
          items={materials}
        />

        <TextInput value={removeMaterialsData.quantity} placeholder='Quantity' keyboardType='numeric' onChangeText={(text) => handleRemoveMaterialsChange(text, 'quantity')} style={[styles.textInput, {marginTop: 20}]} />

        <Pressable onPress={() => { removeMaterials(); toggleRemoveMaterialsModal(); setRefreshFetchMaterials(refreshFetchMaterials + 1) }} style={styles.button} >
          <Text style={styles.buttonText}>Remove</Text>
        </Pressable>
        <Pressable onPress={() => { toggleRemoveMaterialsModal() }} style={styles.button} >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default RemoveMaterialsModal