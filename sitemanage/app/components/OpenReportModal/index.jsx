import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';
import moment from 'moment'
const OpenReportModal = ({ toggleOpenReportModal, toggleCommentTextInput, report, commentContents, addComment, handleCommentChange, commentTextInput, setCommentTextInput, loading, reportComments }) => {

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', maxHeight: '80%', borderRadius: 10, padding: 10 }}>
                {/* close button */}
                <Pressable style={{ justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => { toggleOpenReportModal(); setCommentTextInput(false); }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                {loading && <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 11, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={'blue'} size={30} /></View>}

                <ScrollView style={{ marginVertical: 10 }}>
                    {/* render reports */}
                    {report &&
                        <View>
                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text style={{ textAlign: 'center', color: 'blue', fontSize: 20, fontWeight: 'bold' }}>{report[0].title}</Text>
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 5 }}>
                                <Text style={{ textAlign: 'center', backgroundColor: '#E5E4E2', color: 'gray', borderRadius: 5 }}>{moment(report[0].createdAt).format('dddd, DD MMMM, YYYY - hh:mm a')}</Text>
                            </View>
                            <ScrollView style={{ backgroundColor: '#ffffff', borderRadius: 5, padding: 10 }}>
                                <Text>{report[0].content}</Text>
                            </ScrollView>
                        </View>}

                    {/* text input for comment */}
                    {commentTextInput ?
                        <TextInput
                            style={[styles.textInput, { marginTop: 10 }]}
                            placeholder='Write your comment...'
                            multiline={true} rows={2}
                            onChangeText={(text) => handleCommentChange(text, 'comment')}
                        /> : null}

                    <View style={{ alignItems: 'flex-end' }}>
                        {reportComments && reportComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => (

                            <ScrollView key={item._id} style={{ width: '80%', backgroundColor: 'yellow', borderRadius: 10, padding: 10, marginTop: 10 }}>
                                <Text>{item.comment}</Text>
                                <Text style={{ color: 'gray', backgroundColor: '#E5E4E2', borderRadius: 5 }}>{moment(item.createdAt).format('dddd, DD MMMM, YYYY - hh:mm a')}</Text>
                            </ScrollView>
                        ))}
                    </View>

                </ScrollView>



                {/* action buttons */}
                <View>
                    <View>
                        <Pressable style={styles.button} onPress={() => { toggleCommentTextInput(); }}>
                            {commentTextInput ?
                                <Text style={styles.buttonText}>Remove comment</Text> :
                                <Text style={styles.buttonText}>Add comment</Text>
                            }
                        </Pressable>
                        {commentTextInput &&
                            <Pressable style={styles.button} onPress={() => { addComment(); setCommentTextInput(false); }}>
                                <Text style={styles.buttonText}>Save comment</Text>
                            </Pressable>}

                    </View>
                </View>
            </View>
        </View>
    )
}

export default OpenReportModal