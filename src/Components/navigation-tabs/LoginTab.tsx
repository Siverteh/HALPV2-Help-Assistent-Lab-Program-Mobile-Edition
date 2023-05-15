import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../../features/Login'
import { RootStackParamList } from '../../types'
import Register from '../../features/Register'
import Settings from '../../features/Settings'
import RegisterDiscord from "../../features/RegisterDiscord";
import ForgottenPassword from '../../features/ForgottenPassword'
import PrivacyPolicy from '../../features/PrivacyPolicy'

const Stack = createNativeStackNavigator<RootStackParamList>();

function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={Login} options={{ headerShown: false }}/>
      <Stack.Screen name="SettingScreen" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterDiscord" component={RegisterDiscord} options={{ headerShown: false}}/>
      <Stack.Screen name="ForgottenPassword" component={ForgottenPassword} options={{ headerShown: false }}/>
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default SettingsTab
