import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '../../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoUpdateData } from '../../../redux/todoUpdateData.js';

const UpdateTodoModal = ({ todoUpdateData, toggleUpdateTodoModal, updateTodo, handleUpdateTodoChange, toggleCompletedTrue, toggleCompletedFalse }) => {

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'green', borderRadius: 20, padding: 10 }}>
                <Pressable onPress={toggleUpdateTodoModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                <View style={{ borderBottomColor: '#ffffff', borderBottomWidth: 2, marginBottom: 10 }}>
                    <Text style={styles.buttonText}>Update Todo</Text>
                </View>
                <ScrollView>
                    <TextInput value={todoUpdateData && todoUpdateData.title} placeholder='Title' style={styles.textInput} onChangeText={(text) => handleUpdateTodoChange(text, 'title')} />
                    <TextInput value={todoUpdateData && todoUpdateData.description} placeholder='Description' multiline={true} rows={3} style={styles.textInput} onChangeText={(text) => handleUpdateTodoChange(text, 'description')} />
                </ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>Completed</Text>
                        <View style={{ borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 20, height: 20, backgroundColor: '#ffffff' }}>
                            <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: true })) }} style={{ borderRadius: 50, width: 10, height: 10, backgroundColor: todoUpdateData && todoUpdateData.completed === true && 'blue' }}></Pressable>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text>Not Completed</Text>
                        <View style={{ borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 20, height: 20, backgroundColor: '#ffffff' }}>
                            <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: false })) }} style={{ borderRadius: 50, width: 10, height: 10, backgroundColor: todoUpdateData && todoUpdateData.completed === false && 'blue' }}></Pressable>
                        </View>
                    </View>
                </View>
                <View>

                    {/* action button(s) */}
                    <Pressable style={styles.button} onPress={() => { updateTodo(todoUpdateData._id); }}>
                        <Text style={styles.buttonText}>Update</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default UpdateTodoModal