import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Archive from '../../features/Archive';
import Helplist from '../../features/Helplist';

const Stack = createNativeStackNavigator();

const ArchiveTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Archive" component={Archive} />
      <Stack.Screen name="HelpList" component={Helplist} />
    </Stack.Navigator>
  );
}

export default ArchiveTab