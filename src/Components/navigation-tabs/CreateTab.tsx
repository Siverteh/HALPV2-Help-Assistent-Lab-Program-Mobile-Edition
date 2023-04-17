import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateTicket from '../../features/CreateTicket';
import EditTicket from '../../features/EditTicket';
import LabQueues from '../../features/LabQueues';

const Stack = createNativeStackNavigator();

const CreateTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create" component={CreateTicket} />
      <Stack.Screen name="Edit" component={EditTicket} />
      <Stack.Screen name="Queue" component={LabQueues} />
    </Stack.Navigator>
  );
}

export default CreateTab