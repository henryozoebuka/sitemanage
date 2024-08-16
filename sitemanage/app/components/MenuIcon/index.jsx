import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../../constants/styles';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'
import { toggleMenu } from '../../../redux/menu';
import { toggleLoggedIn } from '../../../redux/loggedIn';
import { useNavigation } from '@react-navigation/native';
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
    <View style={[{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }]}>
      {loggedIn &&
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back" size={24} color="blue" />
        </Pressable>}

      <View>
        {loggedIn &&
          <Pressable onPress={handleLogout}>
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Logout</Text>
          </Pressable>
        }
      </View>

    </View>
  )
}

export default MenuIcon

