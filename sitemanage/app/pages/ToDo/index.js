import { Pressable, SafeAreaView, ActivityIndicator, ScrollView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../constants/styles'
import { useEffect } from 'react'
import ToDoModal from '../../components/ToDoModal'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import UpdateTodoModal from '../../components/UpdateTodoModal'
import {setTodoUpdateData} from '../../../redux/todoUpdateData.js'


const ToDo = () => {
    const { url } = useSelector(state => state.baseURL)
    const { user } = useSelector(state => state.user)
    const { todoUpdateData } = useSelector(state => state.todoUpdateData)
    const { todoCompleted } = useSelector(state => state.todoCompleted)
    const dispatch = useDispatch()
    const [toDoModal, setToDoModal] = useState(false)
    const [updateTodoModal, setUpdateTodoModal] = useState(false)
    const [toDoData, setToDoData] = useState({})
    const [data, setData] = useState([])
    const [completed, setCompleted] = useState(false)
    const [refreshPage, setRefreshPage] = useState(0)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchTodos()
    }, [refreshPage])

    //handle change
    const handleChange = (text, fieldName) => {
        setToDoData({ ...toDoData, createdBy: user._id, [fieldName]: text })
    }


    //Individual update data
    const getUpdateData = (updateId) => {
        const filter = data.find(item => item._id === updateId)
        dispatch(setTodoUpdateData(filter))
    }

    //handle individual todo change
    const handleUpdateTodoChange = (text, fieldName) => {
        dispatch(setTodoUpdateData({...todoUpdateData, [fieldName]: text}))
    }

    //create Todo 
    const postToDo = async () => {
        try {
            const response = await axios.post(`${url}/posttodo`, toDoData)
            if (response) {
                alert(response.data.message)
                setToDoModal(false)
                setRefreshPage(refreshPage + 1)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //fetch ToDos
    const fetchTodos = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/fetchtodos`)
            if (response.status === 200) {
                setData(response.data)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    //update todo
    const updateTodo = async (id) => {
        try {
            const response = await axios.patch(`${url}/updatetodo/${id}`, todoUpdateData)
            if(response){
                alert(response.data.message)
                setUpdateTodoModal(false)
                setRefreshPage(refreshPage + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //toggle todo modal
    const toggleToDoModal = () => {
        setToDoModal(!toDoModal)
    }

    //toggle update todo modal
    const toggleUpdateTodoModal = () => {
        setUpdateTodoModal(!updateTodoModal)
    }


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={{marginBottom: 10}}>
                <Text style={{color: 'blue', fontWeight: 'bold', textAlign: 'center', fontSize: 30}}>Todos</Text>
            </View>
            <ScrollView>
                {loading ? 
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <ActivityIndicator color={'blue'} size={30} />
                </View>:
                 data && data.length ? [
                    ...data.filter(item => item.completed === false),
                    ...data.filter(item => item.completed === true)
                 ].map((item) => (
                    <Pressable onPress={()=>{toggleUpdateTodoModal(); getUpdateData(item._id)}} key={item._id} style={{ backgroundColor: '#00f0ff', borderRadius: 10, padding: 10, marginBottom: 10 }}>
                        {item.completed === true && <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 2, borderRadius: 10, backgroundColor: 'rgba(0, 255, 0, 0.5)', alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 30}}>Completed</Text>
                            </View>}
                        <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <View style={{alignItems: 'flex-end'}}>
                            <Text style={{textAlign: 'right', backgroundColor: '#F2F2F2', borderRadius: 10, paddingHorizontal: 5}}>{moment(item.createdAt).format('dddd, MMMM DD, YYYY - hh:mm a')}</Text>
                        </View>
                    </Pressable>
                )) :
                    <Text>You don't have any todos in your record.</Text>
                }
            </ScrollView>
            <View>
                <Pressable style={styles.button} onPress={toggleToDoModal}>
                    <Text style={styles.buttonText}>Create ToDo</Text>
                </Pressable>
            </View>

            {toDoModal && <ToDoModal postToDo={postToDo} toggleToDoModal={toggleToDoModal} handleChange={handleChange} />}

            {updateTodoModal && <UpdateTodoModal data={data} toggleUpdateTodoModal={toggleUpdateTodoModal} updateTodo={updateTodo} handleUpdateTodoChange={handleUpdateTodoChange} todoUpdateData={todoUpdateData} />}

        </SafeAreaView>
    )
}

export default ToDo