import { SafeAreaView, Pressable, TextInput, Text, View, Alert } from 'react-native'
import { styles } from '../../constants/styles.js'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AddMaterialsModal from '../../components/AddMaterialsModal/index.jsx'
import MyUsedItemsModal from '../../components/MyUsedItemsModal/index.jsx'
import RemoveMaterialsModal from '../../components/RemoveMaterialsModal/index.jsx'
import ItemsSummaryModal from '../../components/ItemsSummaryModal/index.jsx'
import { setAddMaterialsData } from '../../../redux/addMaterialsData.js'
import { setMyUsedItems } from '../../../redux/myUsedItems.js'
import moment from 'moment'


const Materials = () => {
    const { url } = useSelector(state => state.baseURL)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { myUsedItems } = useSelector(state => state.myUsedItems)
    const { addMaterialsData } = useSelector(state => state.addMaterialsData)
    const [data, setData] = useState([])
    // const [myUsedItems, setMyUsedItems] = useState([])
    const [searchResult, setSearchResult] = useState([])
    const [render, setRender] = useState([])
    const [verifyAccount, setVerifyAccount] = useState({})
    const [emptySearch, setEmptySearch] = useState(false)
    const [loading, setLoading] = useState(false)
    const [addMaterialsModal, setAddMaterialsModal] = useState(false)
    const [removeMaterialsModal, setRemoveMaterialsModal] = useState(false)
    const [removeMaterialsData, setRemoveMaterialsData] = useState({})
    const [itemsSummaryModal, setItemsSummaryModal] = useState(false)
    const [myUsedItemsModal, setMyUsedItemsModal] = useState(false)
    const [refreshFetchMaterials, setRefreshFetchMaterials] = useState(0)
    const [filteredMaterials, setFilteredMaterials] = useState({})
    const [fetchMaterialsCompleted, setFetchMaterialsCompleted] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            await fetchMaterials()
            fetchItemsSummary()
        }
        fetchData()
    }, [refreshFetchMaterials])

    const fetchMaterials = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/materials`);
            if (response.status === 201) {
                Alert.alert(response.data.message);
            } else {
                dispatch(setMyUsedItems(response.data))
                setData(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setFetchMaterialsCompleted(true)
        }
    };


    const handleSearch = (text) => {
        setLoading(true)
        let searchText = text.toLowerCase()
        const filteredData = data.filter(item => item.name.toLowerCase().includes(searchText) ||
            item.quantity.toString().toLowerCase().includes(searchText) ||
            item.createdAt.toLowerCase().includes(searchText)
        )

        if (searchText.length === 0) {
            setRender(data)
            setEmptySearch(false)
        }
        else {
            setRender(filteredData)
            setEmptySearch(filteredData.length === 0)
        }
        setLoading(false)
    };

    const toggleAddMaterialsModal = () => {
        if (fetchMaterialsCompleted) {
            setAddMaterialsModal(!addMaterialsModal)
            dispatch(setAddMaterialsData({
            }))
            setVerifyAccount({})
            setRefreshFetchMaterials(prev => prev + 1)
        }
    };

    const toggleRemoveMaterialsModal = () => {
        if (fetchMaterialsCompleted) {
            setRemoveMaterialsModal(!removeMaterialsModal)
            setRemoveMaterialsData({})
            setRefreshFetchMaterials(removeMaterials + 1)
        }
    };

    const handleChange = async (text, fieldName) => {
        let value = text
        if (fieldName === 'quantity') {
            value = parseFloat(text)
        }

        if (fieldName === 'accountNumber' && value.length > 5) {
            await fetchUser(value)
        }
        if (fieldName === 'accountNumber' && value.length <= 5) {
            setVerifyAccount({})
        }

        dispatch(setAddMaterialsData({ ...addMaterialsData, addedBy: user._id, givenTo: verifyAccount._id, [fieldName]: value }))

    };

    //fetch user to verify user
    const fetchUser = async (accountNumber) => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/useraccount/${accountNumber}`)
            if (response.status === 200) {
                setVerifyAccount(response.data)
            }
            else {
                setVerifyAccount({})
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // handle materials to be added to materials collection
    const addMaterials = async () => {
        try {
            const response = await axios.post(`${url}/addmaterials`, addMaterialsData)
            if (response.status === 200) {
                Alert.alert(response.data.message)
                dispatch(setAddMaterialsData({
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    // toggle items summary modal function
    const toggleItemsSummaryModal = () => {
        if (fetchMaterialsCompleted) {
            setItemsSummaryModal(!itemsSummaryModal)
        }
    }

    //my used items modal toggle function

    const toggleMyUsedItemsModal = () => {
        if (fetchMaterialsCompleted) {
            // setRefreshFetchMaterials(refreshFetchMaterials + 1)
            setMyUsedItemsModal(!myUsedItemsModal)
        }
    }

    // fetch items summary function
    const fetchItemsSummary = () => {

        try {
            setLoading(true)
            const totals = data.reduce((acc, item) => {
                const { name, quantity } = item
                if (!acc[name]) {
                    acc[name] = 0
                }
                acc[name] += quantity
                return acc
            }, {})
            setFilteredMaterials(totals)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    //remove materials function
    const removeMaterials = async () => {
        try {
            const response = await axios.post(`${url}/removematerials`, removeMaterialsData)
            if (response.status === 200) {
                alert(response.data.message)
                setRemoveMaterialsData({})
            }
            else if (response.status === 201) {
                alert(response.data.message)
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    //handle remove materials change
    const handleRemoveMaterialsChange = async (text, fieldName) => {
        let value = text
        if (fieldName === 'quantity') {
            value = parseFloat(text)
        }
        setRemoveMaterialsData({ ...removeMaterialsData, removedBy: user._id, [fieldName]: value })
    }



    //removed materials alert
    const materialsRemovedAlert = () => {
        Alert.alert(`${removeMaterialsData.quantity} of ${removeMaterialsData.name} removed successfully`)
    }


    return (
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={{ textAlign: 'center', color: 'blue', fontWeight: 'bold', fontSize: 30 }}>Materials</Text>
            {/* items search */}
            <View>
                <TextInput style={styles.textInput} placeholder='Search items...' onChangeText={handleSearch} />
            </View>

            {/* ScrollView for individual items added */}
            <ScrollView style={{ marginBottom: 10 }}>
                {/* individual items added */}
                <Pressable>
                    {loading ?
                        <ActivityIndicator color={'blue'} size={30} /> :
                        emptySearch ? <Text>No result for your search.</Text> :
                            render.length > 0 ?
                                render.map((item, index) => (
                                    <Pressable key={index} style={[styles.view, { backgroundColor: '#00f0ff', borderRadius: 10, marginBottom: 10 }]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ fontWeight: 'bold' }}>Item: </Text>
                                            <Text>{item.name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Quantity: </Text>
                                                <Text>{item.quantity}</Text>
                                            </View>

                                            {item.addedBy && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Added by: </Text>
                                                <Text>{item.addedBy.firstname}</Text>
                                            </View>}
                                            {item.removedBy && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Removed by: </Text>
                                                <Text>{item.removedBy.firstname}</Text>
                                            </View>}
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Date added: </Text>
                                                <Text>{moment(item.createdAt).format('dddd, MMMM DD, YYYY - hh:mm a')}</Text>
                                            </View>
                                    </Pressable>
                                )) :

                                data.length ?
                                    data.map((item, index) => (
                                        <Pressable key={index} style={[styles.view, { backgroundColor: '#00f0ff', borderRadius: 10, marginBottom: 10 }]}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Item: </Text>
                                                <Text>{item.name}</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Quantity: </Text>
                                                <Text>{item.quantity}</Text>
                                            </View>

                                            {item.addedBy && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Added by: </Text>
                                                <Text>{item.addedBy.firstname}</Text>
                                            </View>}
                                            {item.removedBy && <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Removed by: </Text>
                                                <Text>{item.removedBy.firstname}</Text>
                                            </View>}
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: 'bold' }}>Date added: </Text>
                                                <Text>{moment(item.createdAt).format('dddd, MMMM DD, YYYY - hh:mm a')}</Text>
                                            </View>
                                        </Pressable>
                                    )) :
                                    <Text>No data to show</Text>
                    }
                </Pressable>
            </ScrollView>

            {/* action buttons */}
            <View style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 5, gridTemplateColumns: '50% 50%' }}>
                {user.role === 'admin' && <Pressable onPress={() => { toggleAddMaterialsModal() }} style={styles.button}>
                    <Text style={[styles.buttonText, { textAlign: 'center' }]}>Add Item</Text>
                </Pressable>}
                <Pressable style={styles.button} onPress={() => { toggleItemsSummaryModal(); setRefreshFetchMaterials(refreshFetchMaterials) }} >
                    <Text style={[styles.buttonText, { textAlign: 'center' }]}>Stock</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => { toggleRemoveMaterialsModal() }} >
                    <Text style={[styles.buttonText, { textAlign: 'center' }]}>Remove Item</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => { toggleMyUsedItemsModal(); setRefreshFetchMaterials(refreshFetchMaterials) }} >
                    <Text style={[styles.buttonText, { textAlign: 'center' }]}>Used Items</Text>
                </Pressable>
            </View>

            {/* add materials modal */}
            {addMaterialsModal &&
                <AddMaterialsModal toggleAddMaterialsModal={toggleAddMaterialsModal} handleChange={handleChange} addMaterials={addMaterials} addMaterialsData={addMaterialsData} verifyAccount={verifyAccount} loading={loading} setAddMaterialsData={setAddMaterialsData} setRefreshFetchMaterials={setRefreshFetchMaterials} refreshFetchMaterials={refreshFetchMaterials} />
            }

            {removeMaterialsModal &&
                <RemoveMaterialsModal toggleRemoveMaterialsModal={toggleRemoveMaterialsModal} handleRemoveMaterialsChange={handleRemoveMaterialsChange} removeMaterialsData={removeMaterialsData} verifyAccount={verifyAccount} loading={loading} setRemoveMaterialsData={setRemoveMaterialsData} removeMaterials={removeMaterials} setRefreshFetchMaterials={setRefreshFetchMaterials} refreshFetchMaterials={refreshFetchMaterials} />
            }

            {/* items summary modal */}
            {itemsSummaryModal &&
                <ItemsSummaryModal filteredMaterials={filteredMaterials} toggleItemsSummaryModal={toggleItemsSummaryModal} data={data} />
            }

            {myUsedItemsModal &&
                <MyUsedItemsModal data={myUsedItems} toggleMyUsedItemsModal={toggleMyUsedItemsModal} loading={loading} setLoading={setLoading} />
            }
        </SafeAreaView>
    )
}

export default Materials