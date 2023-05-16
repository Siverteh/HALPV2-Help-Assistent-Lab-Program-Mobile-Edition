import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../features/Settings';
import Login from '../../features/Login';
import { RootStackParamList } from '../../types';
import Register from '../../features/Register';
import ChangePassword from '../../features/ChangePassword';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import PrivacyPolicy from '../../features/PrivacyPolicy';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingsTab() {
  const { background, text } = useContext(ThemeContext)
  return (
    <Stack.Navigator>
      <Stack.Screen name="SettingScreen" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: false }}/>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default SettingsTab