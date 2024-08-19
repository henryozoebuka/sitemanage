import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../../../redux/menu';
import { toggleLoggedIn } from '../../../redux/loggedIn';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuIcon = () => {
  const navigation = useNavigation()
  const { menu } = useSelector(state => state.menuState)
  const { loggedIn } = useSelector(state => state.login)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(toggleLoggedIn())
  }
  
  return (
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 }]}>
      {loggedIn &&
        <Pressable onPress={() => navigation.navigate('Home')} style={{justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons name="chevron-back" size={24} color="blue" />
        </Pressable>}

      {/* site name */}
      <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>Site Manage</Text>
      </View>

      <View>
        {loggedIn &&
          <Pressable onPress={handleLogout} style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Logout</Text>
          </Pressable>
        }
      </View>

    </View>
  )
}

export default MenuIcon

