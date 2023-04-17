import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Archive from '../../features/Archive';
import Helplist from '../../features/Helplist';
import LabQueues from '../../features/LabQueues';

const Stack = createNativeStackNavigator();

function HelpListTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LabQueues" component={LabQueues} options={{ headerShown: false }}/>
      <Stack.Screen name="Archive" component={Archive} options={{ headerShown: false }}/>
      <Stack.Screen name="HelpList" component={Helplist} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HelpListTab