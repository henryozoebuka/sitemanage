import { StyleSheet, Text, View, ActivityIndicator, TextInput, Pressable, Alert } from 'react-native'
import React from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { useSelector } from 'react-redux'
import { styles } from '../../constants/styles.js'

const AddMaterialsModal = ({ toggleAddMaterialsModal, handleChange, addMaterials, verifyAccount, addMaterialsData, loading, setRefreshFetchMaterials, refreshFetchMaterials }) => {
  
  const { user } = useSelector(state => state.user)

  const materialAddedAlert = () => {
    Alert.alert(`${addMaterialsData.quantity} of ${addMaterialsData.name} added successfully`)
  }


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
        {loading ? <ActivityIndicator size={30} color={'blue'} /> : verifyAccount && verifyAccount.username ?
          <View>
            <Text>{verifyAccount?.firstname}</Text>
            <Text>{verifyAccount?.lastname}</Text>
          </View> :

          null
        }

        <TextInput value={addMaterialsData.accountNumber} placeholder='Account Number' onChangeText={(text) => handleChange(text, 'accountNumber')} style={styles.textInput} />
        
    

{user.role === 'admin' &&
  <RNPickerSelect
    value={addMaterialsData.name} // Use addMaterialsData.name as the value
    onValueChange={(value) => handleChange(value, 'name')} // Update addMaterialsData.name on change
    items={materials}
  />
}

<TextInput value={addMaterialsData.quantity} placeholder='Quantity' keyboardType='numeric' onChangeText={(text) => handleChange(text, 'quantity')} style={styles.textInput} />

        <Pressable onPress={()=>{addMaterials(); toggleAddMaterialsModal() }} style={styles.button} >
          <Text style={styles.buttonText}>Add</Text>
        </Pressable>
        <Pressable onPress={() => { toggleAddMaterialsModal() }} style={styles.button} >
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default AddMaterialsModal