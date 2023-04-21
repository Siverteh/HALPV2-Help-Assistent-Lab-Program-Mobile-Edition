import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTicket from '../../features/CreateTicket';
import EditTicket from '../../features/EditTicket';
import Queue from '../../features/Queue';
import { RootStackParamList } from '../../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const CreateTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CreateScreen" component={CreateTicket} options={{ headerShown: false }}/>
      <Stack.Screen name="Edit" component={EditTicket} options={{ headerShown: false }}/>
      <Stack.Screen name="Queue" component={Queue} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}

export default CreateTab