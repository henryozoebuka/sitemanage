import { Pressable, Image, Text, View } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
const Test = () => {
  const [image, setImage] = useState(null)
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }
  return (
    <View>
      <Image source={{ uri: image }} style={{ height: 50, width: 50, borderRadius: 50, borderColor: 'green', borderWidth: 2 }} />
      <Pressable onPress={pickImage}>
        <Text>Upload Image</Text>
      </Pressable>
    </View>
  )
}

export default Test