import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Users from './pages/Users';
import User from './pages/User';
import EditUser from './pages/EditUser';
import Materials from './pages/Materials';
import OtherUser from './pages/OtherUser';
import Reports from './pages/Reports';
import Expenses from './pages/Expenses';
import ToDo from './pages/ToDo';
import { useSelector, useDispatch } from 'react-redux';
import { Pressable } from 'react-native';
import { setMenuFalse } from '../redux/menu';

const Stack = createStackNavigator();


const MyStack = () => {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector(state => state.login)
  const { user } = useSelector(state => state.user)
  const closeMenu = () => {
    dispatch(setMenuFalse())
  }

  return (
    <Pressable onPress={() => { closeMenu() }} style={{ flex: 1 }}>
      <Stack.Navigator initialRouteName="Login">

        {!loggedIn
          ?
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
          </>
          :
          <>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            {user.role === "admin" && (<Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />)}
            <Stack.Screen name="My Profile" component={User} options={{ headerShown: false }} />
            <Stack.Screen name="Other User" component={OtherUser} options={{ headerShown: false }} />
            <Stack.Screen name="Edit User" component={EditUser} options={{ headerShown: false }} />
            <Stack.Screen name="Materials" component={Materials} options={{ headerShown: false }} />
            <Stack.Screen name="Expenses" component={Expenses} options={{ headerShown: false }} />
            <Stack.Screen name="To Do" component={ToDo} options={{ headerShown: false }} />
            {(user.role === 'admin' || user._id === user._id) && <Stack.Screen name="Reports" component={Reports} options={{ headerShown: false }} />}
          </>
        }
      </Stack.Navigator>
    </Pressable>
  );
}

export default MyStack