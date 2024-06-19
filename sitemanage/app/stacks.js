import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import User from './pages/User';
import EditUser from './pages/EditUser';
import AddMaterial from './pages/AddMaterial';
import Materials from './pages/Materials';
import Transactions from './pages/Transactions';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Sign Up" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Users" component={Users} options={{ headerShown: false }} />      
      <Stack.Screen name="User" component={User} options={{ headerShown: false }} />
      <Stack.Screen name="Edit User" component={EditUser} options={{ headerShown: false }} />
      <Stack.Screen name="Add Material" component={AddMaterial} options={{ headerShown: false }} /> 
      <Stack.Screen name="Materials" component={Materials} options={{ headerShown: false }} /> 
      <Stack.Screen name="Transactions" component={Transactions} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

export default MyStack