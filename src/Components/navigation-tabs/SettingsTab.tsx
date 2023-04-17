import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../features/Settings';
import ChangePassword from '../../features/ChangePassword';

const Stack = createNativeStackNavigator();

function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
}

export default SettingsTab