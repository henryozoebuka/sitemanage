import { SafeAreaView, Pressable, Picker, Text, View, TextInput, Image } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

const EditUser = ({ route }) => {

  const navigation = useNavigation()
  const { url } = useSelector(state => state.baseURL)
  const { user } = useSelector(state => state.user)
  const { id } = route.params
  const [image, setImage] = useState(null)
  const [userToEdit, setUserToEdit] = useState({
  })
  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${url}/user/${id}`)
      setUserToEdit(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (text, fieldName) => {
    setUserToEdit({ ...userToEdit, [fieldName]: text })
  }


  const handleSubmit = async (id) => {
    try {
      const formData = new FormData()
      formData.append('firstname', userToEdit.firstname)
      formData.append('lastname', userToEdit.lastname)
      formData.append('gender', userToEdit.gender)
      formData.append('role', userToEdit.role)
      formData.append('status', userToEdit.status)
      // FormDataEvent.append
      if (image) {
        const localUri = image;
        const filename = localUri.split('/').pop();

        // Assume 'photo' is the field name expected by multer on the backend
        formData.append('photo', {
          uri: localUri,
          name: filename,
          type: 'image/png', // Adjust according to your image type
        });
      }

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const response = await axios.patch(`${url}/user/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.status === 200) {
        alert(response.data.message)
        if (user.role === 'admin') {
          navigation.navigate('Users')
        }
        else {
          ()=>navigation.navigate('My Profile')
        }
      }
      else {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })


    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={{ position: 'relative', borderRadius: 50, borderWidth: 3, borderColor: 'gray', height: 100, width: 100, alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
        {image ? <Image source={{ uri: image }} style={{ height: '100%', width: '100%', borderRadius: 50 }} /> : userToEdit.photo ? <Image source={{ uri: `${url}/${userToEdit.photo}` }} /> : <View><AntDesign name="adduser" size={40} color="black" /></View>}

        <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
          <Pressable onPress={pickPhoto}><View style={{backgroundColor: '#ffff00', borderRadius: 50}}><AntDesign name="camera" size={24} color="black" /></View></Pressable>
        </View>
      </View>
      <TextInput style={styles.textInput} value={userToEdit.firstname} onChangeText={(text) => handleChange(text, 'firstname')} />
      <TextInput style={styles.textInput} value={userToEdit.lastname} onChangeText={(text) => handleChange(text, 'lastname')} />
      <RNPickerSelect
        value={userToEdit.gender}
        onValueChange={(value) => handleChange(value, 'gender')}
        items={[{ label: 'Gender', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },]}
      />
      {user.role === 'admin' &&
        <>
          <RNPickerSelect
            value={userToEdit.role}
            onValueChange={(value) => handleChange(value, 'role')}
            items={[{ label: 'Role', value: '' },
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },]}
          />

          <RNPickerSelect
            value={userToEdit.status}
            onValueChange={(value) => handleChange(value, 'status')}
            items={[{ label: 'Status', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Inactive', value: 'inactive' },]}
          />
        </>

      }
      <Pressable style={styles.button}>
        <Text style={styles.buttonText} onPress={() => handleSubmit(userToEdit._id)}>Update</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default EditUser