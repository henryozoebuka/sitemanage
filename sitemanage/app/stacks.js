import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import User from './pages/User';
import EditUser from './pages/EditUser';
import Materials from './pages/Materials';
import Test from './pages/Test';
import OtherUser from './pages/OtherUser';
import Reports from './pages/Reports';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();


const MyStack = () => {
  const { loggedIn } = useSelector(state => state.login)
  const { user } = useSelector(state => state.user)
  return (
    <Stack.Navigator initialRouteName="Login">

      {!loggedIn
        ?
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
        </>
        :
        <>
          {user.role === "admin" && (<Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />)}
          <Stack.Screen name="My Profile" component={User} options={{ headerShown: false }} />
          <Stack.Screen name="Other User" component={OtherUser} options={{ headerShown: false }} />
          <Stack.Screen name="Edit User" component={EditUser} options={{ headerShown: false }} />
          <Stack.Screen name="Materials" component={Materials} options={{ headerShown: false }} />
          <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
          {(user.role === 'admin' || user._id === user._id) && <Stack.Screen name="Reports" component={Reports} options={{ headerShown: false }} />}
        </>
      }
    </Stack.Navigator>
  );
}

export default MyStack