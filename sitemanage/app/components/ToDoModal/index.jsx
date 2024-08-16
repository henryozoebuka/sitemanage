import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import AntDesign from '@expo/vector-icons/AntDesign';

const ToDoModal = ({ postToDo, toggleToDoModal, handleChange }) => {
  return (
    <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ width: '80%', backgroundColor: 'green', borderRadius: 20, padding: 10 }}>
        <Pressable onPress={toggleToDoModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
          <AntDesign name="close" size={24} color="#ffffff" />
        </Pressable>
        <View style={{ borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 10 }}>
          <Text style={styles.buttonText}>Create ToDo</Text>
        </View>
        <ScrollView>
          <TextInput placeholder='Title' style={styles.textInput} onChangeText={(text)=>handleChange(text, 'title')}/>
          <TextInput placeholder='Description' multiline={true} rows={3} style={styles.textInput} onChangeText={(text)=>handleChange(text, 'description')}/>
        </ScrollView>
        <View>

          {/* action button(s) */}
          <Pressable style={styles.button} onPress={() => { postToDo(); }}>
            <Text style={styles.buttonText}>Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default ToDoModal