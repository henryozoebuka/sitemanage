import { Pressable, TextInput, Text, ScrollView, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../constants/styles'
import WriteReportsModal from '../../components/WriteReportModal'
import OpenReportModal from '../../components/OpenReportModal'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Reports = () => {
    const { url } = useSelector(state => state.baseURL)
    const [reports, setReports] = useState([])
    const [report, setReport] = useState([])
    const [reportData, setReportData] = useState({})
    const [reportComments, setReportComments] = useState([])
    const [commentData, setCommentData] = useState({})
    const [writeReportsModal, setWriteReportModal] = useState(false)
    const [openReportModal, setOpenReportModal] = useState(false)
    const [commentContents, setCommentContents] = useState([])
    const [commentTextInput, setCommentTextInput] = useState(false)
    const [refreshPage, setRefreshPage] = useState(0)
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        fetchReports()
    }, [refreshPage])

    //fetch reports
    const fetchReports = async () => {
        const response = await axios.get(`${url}/reports`)
        if (response.status === 200) {
            setReports(response.data)
        }
        else {
            Alert.alert(response.data.message)
        }
    }

    const individualReport = (id) => {
        const filteredIndividualReport = reports.filter(item => item._id === id)
        setReport(filteredIndividualReport)
    }

    //post report
    const postReport = async () => {
        const response = await axios.post(`${url}/postreport`, reportData)
        if (response.status === 200) {
            alert(response.data.message)
            setRefreshPage(refreshPage + 1)
            console.log(refreshPage)
        }
        else {
            alert(response.data.message)
        }
    }

    //add comment
    const addComment = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${url}/postcomment`, commentData)
        if(response.status === 200){
            alert(response.data.message)
        } else {
            alert(response.data.message)
        }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    //fetch report comments
    const fetchReportComments = async (reportId) => {
        try {
            const response = await axios.get(`${url}/fetchcomments/${reportId}`)
            if(response.status === 200){
                setReportComments(response.data)
            }
            else{
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }


    //add comment text input function
    // const addCommentTextInput = () => {
    //     const comment = ''
    //     setCommentContents([...commentContents, ''])
    // }

    
    //handle report text input change
    const handleChange = (text, fieldName) => {

        if (fieldName.startsWith('comment')) {
            setReportData(prevData => ({ ...prevData, comments: { ...prevData.comments, [fieldName]: text } }))
        }
        else {
            setReportData({ ...reportData, [fieldName]: text })
        }

        console.log(reportData)
    }

    //handle comment text input
    const handleCommentChange = (text, fieldName) => {
        // sdetCommentData({...commentData, commentId: report[0]._id, [fieldName]: text})
        setCommentData(prevCommentData => ({...prevCommentData, commentId: report[0]._id, comment: {...prevCommentData.comment, [fieldName]: text }}))

        console.log(commentData)
    }

    // toggle report modal
    const toggleWriteReportsModal = () => {
        setWriteReportModal(!writeReportsModal)
        setCommentContents([])
        setReportData({})
    }

    // toggle report modal
    const toggleOpenReportModal = () => {
        setOpenReportModal(!openReportModal)
        setCommentContents([])
        setReportData({})
    }

    //toggle comment text input
    const toggleCommentTextInput = () => {
        setCommentTextInput(!commentTextInput)
        // if(commentTextInput === false){
        //     setReportData({...reportData, {`comment-${report.length}: ''`}})
        // }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'green', padding: 10 }}>
            {/* action buttons   */}
            <ScrollView>

                {reports && reports.length ?
                    reports.map((item) => (
                        <Pressable key={item._id} onPress={()=>{toggleOpenReportModal(), individualReport(item._id); fetchReportComments(item._id);}}>
                        <View style={{ borderRadius: 10, backgroundColor: '#ffffff', borderWidth: 2, borderColor: '#000000', marginBottom: 10 }}>
                            <Text style={[styles.text15, { fontWeight: 'bold', textAlign: 'center' }]}>{item.title}</Text>
                            <View>
                                <Text style={[styles.text15]}>{item.content}</Text>
                            </View>
                            {item.comments &&
                                Object.keys(item.comments).map((commentKey, index) => (
                                    <View key={index}>
                                        <Text>{item.comments[commentKey]}</Text>
                                    </View>
                                ))
                            }
                            
                        </View>
                        </Pressable>
                    )) : <Text>No report in your records.</Text>
                }

            </ScrollView>

            {/*action button */}
            <View>
                <Pressable style={styles.button} onPress={() => { toggleWriteReportsModal() }}>
                    <Text style={styles.buttonText}>Write report</Text>
                </Pressable>
            </View>

            {/* write report modal */}
            {writeReportsModal && <WriteReportsModal handleChange={handleChange} toggleWriteReportsModal={toggleWriteReportsModal} reportData={reportData} commentContents={commentContents} postReport={postReport} />}

            {/* open report modal */}
            {openReportModal && <OpenReportModal handleCommentChange={handleCommentChange} toggleOpenReportModal={toggleOpenReportModal} addComment={addComment} report={report} commentContents={commentContents} toggleCommentTextInput={toggleCommentTextInput} commentTextInput={commentTextInput} setCommentTextInput={setCommentTextInput} loading={loading} setLoading={setLoading} reportComments={reportComments} />}
        </View>
    )
}

export default Reports