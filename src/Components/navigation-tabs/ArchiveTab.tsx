import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Archive from '../../features/Archive';
import Helplist from '../../features/Helplist';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ArchiveTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ArchiveScreen"
        component={Archive}
        options={{ headerShown: false }}
        />
      <Stack.Screen name="HelpListScreen" component={Helplist} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default ArchiveTab