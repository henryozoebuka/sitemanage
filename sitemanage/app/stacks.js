import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />      
      <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />      
    </Stack.Navigator>
  );
}

export default MyStack