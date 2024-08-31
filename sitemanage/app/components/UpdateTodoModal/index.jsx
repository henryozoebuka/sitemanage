import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '../../constants/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setTodoUpdateData } from '../../../redux/todoUpdateData.js';

const UpdateTodoModal = ({ todoUpdateData, toggleUpdateTodoModal, updateTodo, handleUpdateTodoChange, loading }) => {

    const dispatch = useDispatch()

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ width: '80%', backgroundColor: '#00f0ff', borderRadius: 20, padding: 10 }}>
                <Pressable onPress={toggleUpdateTodoModal} style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                <View style={{ marginBottom: 10 }}>
                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: 'blue'}}>Update Todo</Text>
                </View>
                <ScrollView>
                    <TextInput value={todoUpdateData && todoUpdateData.title} placeholder='Title' style={styles.textInput} onChangeText={(text) => handleUpdateTodoChange(text, 'title')} />
                    <TextInput value={todoUpdateData && todoUpdateData.description} placeholder='Description' multiline={true} rows={3} style={styles.textInput} onChangeText={(text) => handleUpdateTodoChange(text, 'description')} />
                </ScrollView>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginVertical: 20 }}>
                    <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: true })) }} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Pressable style={{ borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 30, height: 30, backgroundColor: '#ffffff', marginLeft: 10 }}>
                            <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: true })) }} style={{ borderRadius: 50, width: 20, height: 20, backgroundColor: todoUpdateData && todoUpdateData.completed === true ? 'blue' : null }}></Pressable>
                        </Pressable>
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Completed</Text>
                    </Pressable>
                    <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: false })) }} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Pressable style={{ borderRadius: 50, alignItems: 'center', justifyContent: 'center', width: 30, height: 30, backgroundColor: '#ffffff', marginLeft: 10 }}>
                            <Pressable onPress={() => { dispatch(setTodoUpdateData({ ...todoUpdateData, completed: false })) }} style={{ borderRadius: 50, width: 20, height: 20, backgroundColor: todoUpdateData && todoUpdateData.completed === false ? 'blue' : null }}></Pressable>
                        </Pressable>
                        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Not Completed</Text>
                    </Pressable>
                </View>
                <View>

                    {/* action button(s) */}
                    <Pressable style={styles.button} onPress={() => { updateTodo(todoUpdateData._id); }}>
                        {loading ? <View style={{position: 'absolute', zIndex: 11, top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color={'#ffffff'} size={30} /></View> : <Text style={styles.buttonText}>Update</Text>}
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default UpdateTodoModal