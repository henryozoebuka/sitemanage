import { Pressable, Text, TextInput, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from '@expo/vector-icons/AntDesign';

const WriteReportsModal = ({ toggleWriteReportsModal, addComment, handleChange, reportData, commentContents, postReport }) => {

    return (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 10, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={{ backgroundColor: '#00f0ff', width: '80%', maxHeight: '80%', borderRadius: 10, padding: 10 }}>
                <Pressable style={{ justifyContent: 'center', alignItems: 'flex-end' }} onPress={() => { toggleWriteReportsModal(); }}>
                    <AntDesign name="close" size={24} color="#ffffff" />
                </Pressable>
                <View style={{ }}>
                    <Text style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold', fontSize: 20 }}>Write Report</Text>
                </View>
                <ScrollView>
                    <View>
                        <Text style={[styles.text15, { fontWeight: 'bold', color: 'blue', margin: 10 }]}>Title</Text>
                        <TextInput value={reportData.title} style={styles.textInput} placeholder='Title' onChangeText={(text) => handleChange(text, 'title')} />
                    </View>
                    <View>
                        <Text style={[styles.text15, { fontWeight: 'bold', color: 'blue', margin: 10 }]}>Content</Text>
                        <TextInput value={reportData.content} style={styles.textInput} placeholder='Write your text...' multiline={true} numberOfLines={4} onChangeText={(text) => handleChange(text, 'content')} />

                    </View>
                    {/*comment section*/}

                </ScrollView>

                {/* action buttons */}
                <View>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <Pressable style={styles.button} onPress={() => { toggleWriteReportsModal(); postReport(); }}>
                            <Text style={styles.buttonText}>Post</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default WriteReportsModal