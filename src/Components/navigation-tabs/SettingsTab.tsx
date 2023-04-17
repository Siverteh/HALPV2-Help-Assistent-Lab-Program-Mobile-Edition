import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Settings from '../../features/Settings';

const Stack = createNativeStackNavigator();

function SettingsTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default SettingsTab