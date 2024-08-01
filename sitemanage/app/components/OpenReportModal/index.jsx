import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import { ScrollView } from 'react-native-gesture-handler'

const OpenReportModal = ({ toggleOpenReportModal, toggleCommentTextInput, report, commentContents, addComment, handleCommentChange, commentTextInput, setCommentTextInput, loading, reportComments }) => {

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ backgroundColor: 'green', width: '80%', maxHeight: '80%', borderRadius: 10, padding: 10 }}>
                {loading && <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={'blue'} size={30} /></View>}
                <ScrollView>
                    {report &&
                        <View style={{backgroundColor: 'yellow', borderRadius: 5, padding: 10}}>
                            <Text>{report[0].title}</Text>
                            <Text>{report[0].content}</Text>

                        </View>}

                    {reportComments && reportComments[0] && reportComments[0].comment ?
                        Object.values(reportComments[0].comment).map((item, index) => (
                            <View key={ index } style={{backgroundColor: '#ffffff', borderRadius: 5, padding: 10, margin: 5}}>
                                <Text>{item}</Text>
                            </View>
                        )) : null}


                    {commentTextInput ?
                        <TextInput
                            style={styles.textInput}
                            placeholder='Write your comment...'
                            multiline={true} rows={2}
                            onChangeText={(text) => handleCommentChange(text, `comment-0`)}
                        /> : commentTextInput && report[0].comments ?
                            <TextInput
                                style={styles.textInput}
                                placeholder='Write your comment...'
                                multiline={true} rows={2}
                                onChangeText={(text) => handleCommentChange(text, `comment-${report[0].comments.length}`)}
                            /> : null}

                </ScrollView>



                {/* action buttons */}
                <View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <Pressable style={styles.button} onPress={() => { toggleCommentTextInput(); }}>
                            {commentTextInput ?
                                <Text style={styles.buttonText}>Remove comment</Text> :
                                <Text style={styles.buttonText}>Add comment</Text>
                            }
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => { toggleOpenReportModal(); setCommentTextInput(false); }}>
                            <Text style={styles.buttonText}>Close</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={() => { addComment(); }}>
                            <Text style={styles.buttonText}>Save comment</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default OpenReportModal