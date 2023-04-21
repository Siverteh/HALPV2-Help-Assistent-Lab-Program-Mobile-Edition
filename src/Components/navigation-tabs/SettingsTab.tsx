import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../features/Settings';
import Login from '../../features/Login';
import { RootStackParamList } from '../../types';
import Register from '../../features/Register';
import ChangePassword from '../../features/ChangePassword';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingScreen" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

export default SettingsTab