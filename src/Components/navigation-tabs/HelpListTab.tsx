import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Archive from '../../features/Archive';
import Helplist from '../../features/Helplist';
import LabQueues from '../../features/LabQueues';
import { RootStackParamList } from '../../types'

const Stack = createNativeStackNavigator<RootStackParamList>();

function HelpListTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LabQueues" component={LabQueues} options={{ headerShown: false }}/>
      <Stack.Screen
        name="ArchiveScreen"
        component={Archive}
        options={{ headerShown: false }}
        />
      <Stack.Screen name="HelpListScreen" component={Helplist} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default HelpListTab