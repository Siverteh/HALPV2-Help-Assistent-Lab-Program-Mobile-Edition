import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../features/Login'
import { RootStackParamList } from '../../types'
import Register from '../../features/Register'
import Settings from '../../features/Settings'

const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="SettingScreen" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default SettingsTab